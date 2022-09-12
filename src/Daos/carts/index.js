let cartDAO

const { default: CartDAOMongoDB } = await import('./CartDAO_MongoDB.js')
cartDAO = new CartDAOMongoDB()
console.log('Set MongoDB as Database for Carts!')

export { cartDAO }
