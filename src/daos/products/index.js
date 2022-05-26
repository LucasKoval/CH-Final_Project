let productDAO

switch (process.env.DB) {
  case 'json':
    const { default: ProductDAOFileSystem } = await import('./ProductDAO_FileSystem.js')
    productDAO = new ProductDAOFileSystem('products')
    break
  case 'mongodb':
    const { default: ProductDAOMongoDB } = await import('./ProductDAO_MongoDB.js')
    productDAO = new ProductDAOMongoDB()
    break
  case 'firebase':
    const { default: ProductDAOFirebase } = await import('./ProductDAO_Firebase.js')
    productDAO = new ProductDAOFirebase()
    break
  default:
    const { default: ProductDAOMemory } = await import('./ProductDAO_Memory.js')
    productDAO = new ProductDAOMemory()
    break
}

export { productDAO }
