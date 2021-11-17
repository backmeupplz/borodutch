function formatNumber(n?: number | string) {
  if (!n) return ''
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export default formatNumber
