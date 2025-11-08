// src/hooks/useProducts.js
import React from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import masokoApi from 'lib/api/masokoApi'
import { queryKeys } from '@/lib/queryKeys'
import {
  cleanProductDescription,
  extractListItems,
  extractPlainText,
} from '@/lib/utils/productDescription'
import { DEFAULT_FILTER_VALUES } from '@/constants/filterDefaults'

const FALLBACK_AVAILABILITY = 'Available in store'

const SPEC_LABEL_MAP = [
  { key: 'brand', label: 'Brand' },
  { key: 'category', label: 'Category' },
  { key: 'storage', label: 'Storage' },
  { key: 'ram', label: 'RAM' },
  { key: 'display', label: 'Display' },
  { key: 'camera', label: 'Camera' },
  { key: 'color', label: 'Color' },
]

const safeString = (value) => (typeof value === 'string' ? value.trim() : '')

const safeNumber = (value) => {
  if (value === null || value === undefined) return 0
  const normalised = typeof value === 'string' ? value.replace(/,/g, '') : value
  const num = Number.parseFloat(normalised)
  return Number.isFinite(num) ? num : 0
}

const resolveProductArray = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.body)) return payload.body
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.body?.items)) return payload.body.items
  return []
}

const normalizeMediaEntry = (entry) => {
  if (!entry) return null
  if (typeof entry === 'string') return safeString(entry)
  if (typeof entry === 'object') {
    const candidates = [
      entry.full,
      entry.url,
      entry.thumbnail,
      entry.original,
      entry.src,
    ]
    const selected = candidates.find((candidate) => safeString(candidate))
    return safeString(selected)
  }
  return null
}

const getAttributeValue = (item, fieldKeys = [], attributeNames = []) => {
  for (const key of fieldKeys) {
    const value = safeString(item?.[key])
    if (value) return value
  }

  const normalizedAttributeNames = attributeNames
    .filter(Boolean)
    .map((name) => name.toLowerCase())

  const attributes = item?.attributes

  if (Array.isArray(attributes)) {
    for (const attribute of attributes) {
      const label = safeString(attribute?.label || attribute?.name)
      const value = safeString(attribute?.value || attribute?.text)
      if (!label || !value) continue
      const normalizedLabel = label.toLowerCase().replace(/\s+/g, ' ')
      if (
        normalizedAttributeNames.includes(normalizedLabel) ||
        normalizedAttributeNames.includes(label.toLowerCase())
      ) {
        return value
      }
    }
  } else if (attributes && typeof attributes === 'object') {
    for (const [key, value] of Object.entries(attributes)) {
      const label = safeString(key)
      const normalizedValue = safeString(value)
      if (!label || !normalizedValue) continue
      const normalizedLabel = label.toLowerCase().replace(/\s+/g, ' ')
      if (
        normalizedAttributeNames.includes(normalizedLabel) ||
        normalizedAttributeNames.includes(label.toLowerCase())
      ) {
        return normalizedValue
      }
    }
  }

  return ''
}

const buildSpecifications = (product) => {
  const specs = {}

  if (product.sku) {
    specs.SKU = product.sku
  }

  SPEC_LABEL_MAP.forEach(({ key, label }) => {
    const value = safeString(product[key])
    if (value) {
      specs[label] = value
    }
  })

  const attributes = product.attributes

  if (Array.isArray(attributes)) {
    attributes.forEach((attribute) => {
      const label = safeString(attribute?.label || attribute?.name)
      const value = safeString(attribute?.value || attribute?.text)
      if (label && value && !specs[label]) {
        specs[label] = value
      }
    })
  } else if (attributes && typeof attributes === 'object') {
    Object.entries(attributes).forEach(([key, value]) => {
      const label = safeString(key)
      const normalisedValue = safeString(value)
      if (label && normalisedValue && !specs[label]) {
        const titleCased = label
          .replace(/[_-]+/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .replace(/\b\w/g, (char) => char.toUpperCase())
        specs[titleCased] = normalisedValue
      }
    })
  }

  return specs
}

const matchFromDefaults = (textFragments = [], candidates = []) => {
  const text = textFragments.filter(Boolean).join(' ').toLowerCase()
  if (!text) return ''

  const sortedCandidates = [...candidates].sort((a, b) => b.length - a.length)

  for (const candidate of sortedCandidates) {
    const normalizedCandidate = candidate.toLowerCase()
    if (text.includes(normalizedCandidate)) {
      return candidate
    }
  }

  return ''
}

// Hook to get all invoices with filters

export function useProductList(params, options) {
  // Memoize the query key and query parameters
  const queryKey = React.useMemo(
    () => queryKeys.masoko.products.list(params),
    [params],
  )

  // Memoize queryParams to ensure it is only recalculated when params change
  const queryParams = React.useMemo(() => {
    return new URLSearchParams({
      request_id: crypto.randomUUID(), // Fresh per request
      amount: params?.amount || '20000',
      organization: 'liberty',
      channel: 'ussd',
      ...params,
    })
  }, [params])

  let url = `/masoko/masoko-bnpl/products?${queryParams.toString()}`
  url = url.endsWith('?') ? url.slice(0, -1) : url // Removing the trailing '?' if exists and no parameters are added

  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await masokoApi.get(url)
      const items = resolveProductArray(data)

      return items.map((item, index) => {
        const price = safeNumber(item?.price ?? item?.price_value)
        const originalPrice = safeNumber(
          item?.originalPrice ?? item?.original_price ?? item?.price,
        )

        const priceLabelRaw =
          item?.priceLabel ??
          item?.price_formatted ??
          (Number.isFinite(price) ? `KES ${price.toLocaleString()}` : '')

        const priceLabel = priceLabelRaw
          ? priceLabelRaw.toUpperCase().includes('KES')
            ? priceLabelRaw
            : `KES ${priceLabelRaw}`
          : `KES ${price.toLocaleString()}`
        const originalLabelRaw =
          item?.originalPriceLabel ??
          item?.original_price_formatted ??
          item?.priceLabel

        const originalPriceLabel = originalLabelRaw
          ? originalLabelRaw.toUpperCase().includes('KES')
            ? originalLabelRaw
            : `KES ${originalLabelRaw}`
          : priceLabel

        const mediaEntries = []
        if (Array.isArray(item?.media_gallery_sizes)) {
          mediaEntries.push(...item.media_gallery_sizes)
        }
        if (Array.isArray(item?.gallery)) {
          mediaEntries.push(...item.gallery)
        }

        const gallery = mediaEntries
          .map(normalizeMediaEntry)
          .filter(
            (value, position, self) =>
              value && self.indexOf(value) === position,
          )

        const thumbnail = normalizeMediaEntry(item?.thumbnail_url)
        const primaryImage = thumbnail || gallery[0] || '/product.png'

        const rawDescription =
          item?.description ??
          item?.full_description ??
          item?.short_description ??
          ''

        const cleanedDescriptionHtml = cleanProductDescription(rawDescription)
        const descriptionText = extractPlainText(
          cleanedDescriptionHtml || rawDescription,
        )
        const normalizedDescriptionHtml =
          cleanedDescriptionHtml ||
          (descriptionText ? `<p>${descriptionText}</p>` : '')

        const benefits = Array.from(
          new Set(
            extractListItems(cleanedDescriptionHtml || rawDescription).filter(
              Boolean,
            ),
          ),
        )

        const normalizedCategory =
          safeString(item?.category) ||
          getAttributeValue(
            item,
            ['category_name', 'product_category'],
            ['category', 'product category'],
          ) ||
          matchFromDefaults(
            [item?.category, item?.name, item?.title, rawDescription],
            DEFAULT_FILTER_VALUES.category,
          )
        const normalizedBrand =
          safeString(item?.brand) ||
          getAttributeValue(
            item,
            ['brand_name', 'brandName', 'manufacturer'],
            ['brand', 'brand name', 'manufacturer'],
          ) ||
          matchFromDefaults(
            [item?.brand, item?.name, item?.title, rawDescription],
            DEFAULT_FILTER_VALUES.brand,
          )
        const normalizedColor =
          safeString(item?.color) ||
          getAttributeValue(
            item,
            ['colour', 'color_name', 'product_color'],
            ['color', 'colour', 'color name', 'colour name'],
          ) ||
          matchFromDefaults(
            [item?.color, item?.name, rawDescription],
            DEFAULT_FILTER_VALUES.color,
          )
        const normalizedStorage =
          safeString(item?.storage) ||
          safeString(item?.storage_capacity) ||
          safeString(item?.memory) ||
          getAttributeValue(
            item,
            ['storage_size', 'capacity'],
            ['storage', 'storage capacity', 'storage size', 'capacity'],
          ) ||
          matchFromDefaults(
            [item?.storage, item?.name, rawDescription],
            DEFAULT_FILTER_VALUES.storage,
          )
        const normalizedCamera =
          safeString(item?.camera) ||
          safeString(item?.camera_resolution) ||
          getAttributeValue(
            item,
            ['camera_megapixel', 'rear_camera', 'front_camera'],
            ['camera', 'camera resolution', 'camera megapixel'],
          ) ||
          matchFromDefaults(
            [item?.camera, item?.name, rawDescription],
            DEFAULT_FILTER_VALUES.camera,
          )
        const normalizedDisplay =
          safeString(item?.display) ||
          safeString(item?.display_size) ||
          getAttributeValue(
            item,
            ['screen_size', 'display_size'],
            ['display', 'display size', 'screen size'],
          ) ||
          matchFromDefaults(
            [item?.display, item?.name, rawDescription],
            DEFAULT_FILTER_VALUES.display,
          )
        const normalizedRam =
          safeString(item?.ram) ||
          safeString(item?.memory_ram) ||
          safeString(item?.ram_capacity) ||
          getAttributeValue(
            item,
            ['ram_size'],
            ['ram', 'ram size', 'memory ram'],
          ) ||
          matchFromDefaults(
            [item?.ram, item?.name, rawDescription],
            DEFAULT_FILTER_VALUES.ram,
          )

        const specifications = buildSpecifications({
          sku: item?.sku,
          brand: normalizedBrand,
          category: normalizedCategory,
          storage: normalizedStorage,
          ram: normalizedRam,
          display: normalizedDisplay,
          camera: normalizedCamera,
          color: normalizedColor,
          attributes: item?.attributes,
          stock_status: item?.stock_status,
        })

        return {
          id: item?.sku ?? `masoko-${index}`,
          sku: item?.sku ?? '',
          name: safeString(item?.name || item?.title),
          title: safeString(item?.name),
          description: descriptionText,
          descriptionHtml: normalizedDescriptionHtml,
          descriptionText,
          benefits,
          price,
          originalPrice,
          priceLabel,
          originalPriceLabel,
          category: normalizedCategory,
          image: primaryImage,
          gallery,
          brand: normalizedBrand,
          color: normalizedColor,
          storage: normalizedStorage,
          camera: normalizedCamera,
          display: normalizedDisplay,
          ram: normalizedRam,
          stock:
            safeString(item?.stockMessage) ||
            safeString(item?.stock_label) ||
            FALLBACK_AVAILABILITY,
          specifications,
          availability:
            item?.availability ??
            item?.availability_status ??
            item?.stock_status ??
            item?.stockStatus ??
            FALLBACK_AVAILABILITY,
          raw: item,
        }
      })
    },
    cacheTime: 1000 * 60 * 30, // Cache data for 30 minutes
    placeholderData: keepPreviousData,
    enabled: true,
    ...options,
  })
}

export function useProducts(params, options) {
  return useProductList(params, options)
}
