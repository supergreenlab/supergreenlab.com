export default (price) => {
  const off = new Date().getTimezoneOffset() / 60
  if (off <= -1 && off >= -3) {
    return `$${(price * 1.21).toFixed(2)}`
  }
  return `$${price}`
}
