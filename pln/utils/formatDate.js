export default v => {
  const date = new Date(v)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
