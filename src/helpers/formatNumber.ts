function formatNumber(n?: number | string | null) {
  if (n === undefined || n === null || n === '') return ''
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export default formatNumber
