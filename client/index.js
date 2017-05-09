// index.js
module.exports = () => {
  const data = { customer: [] }
  // Create 1000 users
  for (let i = 0; i < 1000; i++) {
    data.customer.push({ id: i, name: `customer${i}` })
  }
  return data
}
