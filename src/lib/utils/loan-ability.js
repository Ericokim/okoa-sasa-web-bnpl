const normalizeNumber = (value) => {
  const numericValue = Number(value)
  return Number.isFinite(numericValue) ? numericValue : undefined
}

const pickFirstNumber = (items = []) => {
  for (const item of items) {
    const normalized = normalizeNumber(item)
    if (normalized !== undefined) {
      return normalized
    }
  }
  return undefined
}

export const buildLoanPayloadKey = (payload = {}, fallbackTerm = 0) => {
  const basicPay = normalizeNumber(payload.basicPay) ?? 0
  const netPay = normalizeNumber(payload.netPay) ?? 0
  const term = normalizeNumber(payload.term) ?? fallbackTerm ?? 0
  return `${basicPay}-${netPay}-${term}`
}

export const extractLoanAbilityEntry = (response) => {
  if (!response) return null

  if (Array.isArray(response)) {
    return response[0] ?? null
  }

  if (Array.isArray(response?.data)) {
    return response.data[0] ?? null
  }

  if (typeof response === 'object') {
    if (response.amount !== undefined) {
      return response
    }
    if (Array.isArray(response.result)) {
      return response.result[0] ?? null
    }
  }

  return response
}

export const resolveLoanAmountFromEntry = (entry) => {
  if (entry === null || entry === undefined) {
    return undefined
  }

  if (typeof entry === 'number') {
    return normalizeNumber(entry)
  }

  if (Array.isArray(entry)) {
    return pickFirstNumber(entry)
  }

  if (typeof entry === 'object') {
    const candidates = [
      entry.loanLimit,
      entry.loan_limit,
      entry.amount,
      entry.limit,
      entry.loanAmount,
      entry.loan_amount,
      entry.value,
    ]

    const normalized = pickFirstNumber(candidates)
    if (normalized !== undefined) {
      return normalized
    }

    if (Array.isArray(entry.values)) {
      return pickFirstNumber(entry.values)
    }
  }

  return normalizeNumber(entry)
}

export const resolveLoanAmountFromResponse = (response) =>
  resolveLoanAmountFromEntry(extractLoanAbilityEntry(response))
