let productDAO

const { default: ProductDAOMongoDB } = await import('./ProductDAO_MongoDB.js')
productDAO = new ProductDAOMongoDB()
console.log('Set MongoDB as Database for Products!')

export { productDAO }
