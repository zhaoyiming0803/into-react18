export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

export const validatePhone = (phone: string) => {
  if (typeof phone !== 'string') {
    return false
  }
  return /^1\d{10}$/.test(phone)
}
