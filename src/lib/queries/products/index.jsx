import { useQuery, keepPreviousData, queryOptions } from '@tanstack/react-query'
import masokoApi from '@/lib/api/api'
import { queryKeys } from '@/lib/queryKeys'
import { MASOKO_FALLBACK_PRODUCTS } from '@/data/masokoFallback'
import {
  cleanProductDescription,
  extractListItems,
  extractPlainText,
} from '@/lib/utils/productDescription'

const DEFAULT_PARAMS = {
  amount: '20000',
  organization: 'liberty',
  channel: 'ussd',
}

const PRODUCTS_STALE_TIME = 1000 * 60 * 15 // 15 minutes
const PRODUCTS_GC_TIME = 1000 * 60 * 45 // 45 minutes
const PLACEHOLDER_IMAGE = '/product.png'
const STOCK_LABEL = 'Available in store'

const COLOR_KEYWORDS = [
  'black',
  'white',
  'green',
  'blue',
  'purple',
  'red',
  'orange',
  'grey',
  'gray',
  'silver',
  'gold',
  'yellow',
  'pink',
  'midnight',
  'deep purple',
  'brown',
]

const currencyFormatter = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('en-KE', {
  maximumFractionDigits: 0,
})

function ensureParams(params = {}) {
  return Object.fromEntries(
    Object.entries({ ...DEFAULT_PARAMS, ...params })
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => [key, String(value)]),
  )
}

function createRequestId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function buildQueryKey(params) {
  const normalized = ensureParams(params)
  return Object.keys(normalized)
    .sort()
    .reduce((acc, key) => {
      acc[key] = normalized[key]
      return acc
    }, {})
}

function toPriceNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }
  if (value === null || value === undefined) return 0
  const numeric = parseFloat(String(value).replace(/[^\d.]/g, ''))
  return Number.isFinite(numeric) ? numeric : 0
}

function formatCurrency(amount) {
  return currencyFormatter.format(Math.max(0, Math.round(amount)))
}

function formatNumber(amount) {
  return numberFormatter.format(Math.max(0, Math.round(amount)))
}

function detectColor(text = '') {
  if (!text) return undefined
  const lower = text.toLowerCase()
  const match = COLOR_KEYWORDS.find((keyword) => lower.includes(keyword))
  if (!match) return undefined
  return match
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function detectStorage(text = '') {
  const match = text.match(/(\d+)\s?(TB|GB)\b/i)
  if (!match) return undefined
  return `${match[1]} ${match[2].toUpperCase()}`
}

function detectRam(text = '') {
  const match =
    text.match(/(\d+)\s?GB\s*RAM/i) ||
    text.match(/RAM[:\s-]*(\d+)\s?GB/i)
  if (!match) return undefined
  return `${match[1]} GB`
}

function detectCamera(text = '') {
  const match =
    text.match(/(\d+)\s?MP/i) ||
    text.match(/Camera[:\s-]*(\d+)\s?MP/i) ||
    text.match(/Back\s*:\s*(\d+)\s?MP/i)
  if (!match) return undefined
  return `${match[1]}MP`
}

function detectDisplay(text = '') {
  const match =
    text.match(/(\d+(?:\.\d+)?)\s?(?:("|''|in|inch|”|″))/i) ||
    text.match(/Display[:\s-]*(\d+(?:\.\d+)?)/i)
  if (!match) return undefined
  const size = parseFloat(match[1])
  if (Number.isNaN(size)) return undefined
  return `${size.toFixed(size % 1 === 0 ? 0 : 1)}"`
}

function detectBrand(item) {
  if (item?.brand) return item.brand
  const match = String(item?.name ?? '')
    .trim()
    .match(/[A-Za-z][A-Za-z0-9+&.-]*/)
  return match ? match[0] : undefined
}

function buildGallery(item) {
  const urls = []

  const addUrl = (value) => {
    const trimmed = typeof value === 'string' ? value.trim() : ''
    if (trimmed) {
      urls.push(trimmed)
    }
  }

  addUrl(item?.thumbnail_url)

  if (Array.isArray(item?.media_gallery_sizes)) {
    item.media_gallery_sizes.forEach((entry) => {
      addUrl(entry?.full)
      addUrl(entry?.thumbnail)
    })
  }

  if (!urls.length) {
    urls.push(PLACEHOLDER_IMAGE)
  }

  while (urls.length < 4) {
    urls.push(urls[urls.length - 1])
  }

  return urls.slice(0, 4)
}

function buildSpecifications({
  brand,
  display,
  camera,
  storage,
  ram,
  color,
  category,
}) {
  const memory = [ram ? `RAM: ${ram}` : null, storage ? `Storage: ${storage}` : null]
    .filter(Boolean)
    .join(', ')

  return Object.fromEntries(
    [
      ['Brand', brand],
      ['Display', display],
      ['Camera', camera],
      ['Memory', memory || undefined],
      ['Colour', color],
      ['Category', category],
    ].filter(([, value]) => Boolean(value)),
  )
}

function normaliseProduct(item, source = 'api') {
  const descriptionHtml = cleanProductDescription(item?.description || '')
  const descriptionText = extractPlainText(descriptionHtml || item?.description || '')
  const listItems = extractListItems(descriptionHtml)
  const summaryText = listItems.length
    ? listItems
        .map((entry) => entry.trim())
        .filter(Boolean)
        .join(', ')
    : descriptionText
  const combinedText = `${item?.name ?? ''} ${descriptionText}`.trim()

  const brand = detectBrand(item)
  const color = item?.color ?? detectColor(combinedText)
  const storage = item?.storage ?? detectStorage(combinedText)
  const ram = item?.ram ?? detectRam(combinedText)
  const camera = item?.camera ?? detectCamera(combinedText)
  const display = item?.display ?? detectDisplay(combinedText)

  const price = toPriceNumber(item?.price)
  const originalPrice = price > 0
    ? Math.max(price, toPriceNumber(item?.original_price ?? item?.price))
    : price

  const gallery = buildGallery(item)

  return {
    id: String(item?.sku ?? item?.id ?? createRequestId()),
    sku: item?.sku ?? null,
    name: item?.name ?? 'Unnamed Product',
    title: item?.name ?? 'Unnamed Product',
    description: summaryText,
    price,
    originalPrice,
    priceLabel: formatCurrency(price),
    originalPriceLabel: formatCurrency(originalPrice),
    pricePlain: formatNumber(price),
    originalPricePlain: formatNumber(originalPrice),
    image: gallery[0],
    gallery,
    category: item?.category ?? 'General',
    brand,
    color,
    storage,
    camera,
    display,
    ram,
    descriptionHtml,
    descriptionText,
    benefits: listItems,
    specifications: buildSpecifications({
      brand,
      display,
      camera,
      storage,
      ram,
      color,
      category: item?.category ?? 'General',
    }),
    stock: STOCK_LABEL,
    source,
  }
}

function normaliseList(list = [], source = 'api') {
  if (!Array.isArray(list) || list.length === 0) return []
  return list.map((item) => normaliseProduct(item, source))
}

function getFallbackProducts() {
  return normaliseList(MASOKO_FALLBACK_PRODUCTS, 'fallback')
}

function mergeProductsWithCart(products = [], cart = []) {
  if (!Array.isArray(products) || products.length === 0) {
    return Array.isArray(products) ? products : []
  }

  const cartMap = new Map(
    Array.isArray(cart)
      ? cart.map((item) => [String(item.productId), item.quantity])
      : [],
  )

  return products.map((product) => {
    const quantity =
      cartMap.get(String(product.id)) ??
      (product.sku ? cartMap.get(String(product.sku)) : undefined)

    if (!quantity) {
      return { ...product, inCart: false, cartQuantity: 0 }
    }

    return { ...product, inCart: true, cartQuantity: quantity }
  })
}

export async function fetchMasokoProducts(params = {}) {
  const normalizedParams = ensureParams(params)
  const searchParams = new URLSearchParams({
    request_id: createRequestId(),
    ...normalizedParams,
  })

  const url = `/masoko/masoko-bnpl/products?${searchParams.toString()}`

  try {
    const { data } = await masokoApi.get(url)
    const payload = Array.isArray(data?.body) ? data.body : data?.data ?? []
    const products = normaliseList(payload, 'api')

    return {
      products,
      meta: {
        source: 'api',
        count: products.length,
        responseCode: data?.header?.responseCode ?? null,
        timestamp: data?.header?.timestamp ?? null,
      },
      params: normalizedParams,
    }
  } catch (error) {
    const products = getFallbackProducts()
    return {
      products,
      meta: {
        source: 'fallback',
        count: products.length,
        error: error?.message ?? 'Fallback products served',
      },
      params: normalizedParams,
    }
  }
}

export const productsQueryOptions = (params = {}) =>
  queryOptions({
    queryKey: queryKeys.masoko.products.list(buildQueryKey(params)),
    queryFn: () => fetchMasokoProducts(params),
    staleTime: PRODUCTS_STALE_TIME,
    gcTime: PRODUCTS_GC_TIME,
  })

export function useProducts(params = {}, options = {}) {
  return useQuery({
    ...productsQueryOptions(params),
    placeholderData: keepPreviousData,
    ...options,
  })
}

export function applyCartState(products = [], cart = []) {
  return mergeProductsWithCart(products, cart)
}
