/* eslint-disable no-console */

const isLoggingEnabled = import.meta.env.DEV

const log = (method, ...args) => {
  if (!isLoggingEnabled || typeof console?.[method] !== 'function') return
  console[method](...args)
}

export const logger = {
  info: (...args) => log('info', ...args),
  log: (...args) => log('log', ...args),
  warn: (...args) => log('warn', ...args),
  error: (...args) => log('error', ...args),
}
