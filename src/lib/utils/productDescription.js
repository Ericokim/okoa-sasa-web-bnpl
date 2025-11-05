const SAFE_TAGS = new Set([
  'p',
  'ul',
  'ol',
  'li',
  'strong',
  'b',
  'em',
  'i',
  'br',
])

export function cleanProductDescription(rawHtml) {
  if (typeof rawHtml !== 'string' || rawHtml.trim() === '') {
    return ''
  }

  const cleaned = rawHtml
    .replace(/\r\n/g, '\n')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(\/?)([a-z0-9]+)([^>]*)>/gi, (match, closing, tag) => {
      const normalizedTag = tag.toLowerCase()

      if (!SAFE_TAGS.has(normalizedTag)) {
        return ''
      }

      if (normalizedTag === 'br') {
        return '<br />'
      }

      return closing ? `</${normalizedTag}>` : `<${normalizedTag}>`
    })

  return cleaned.trim()
}

export function extractPlainText(html = '') {
  if (!html) return ''

  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|li)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+\n/g, '\n')
    .replace(/\n\s+/g, '\n')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export function extractListItems(html = '') {
  if (!html) return []

  return [...html.matchAll(/<li>([\s\S]*?)<\/li>/gi)]
    .map(([, content]) => extractPlainText(content))
    .filter(Boolean)
}
