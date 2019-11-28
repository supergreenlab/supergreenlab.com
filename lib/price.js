export default (price) => {
  const off = new Date().getTimezoneOffset() / 60
  if (off <= 0 && off >= -3) {
    return `US$${(price * 1.21).toFixed(2)}`
  }
  return `US$${price}`
}
