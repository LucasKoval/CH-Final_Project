let productDAO

switch (process.env.DB_ENV) {
  case 'json':
    const { default: ProductDAOFileSystem } = await import('./ProductDAO_FileSystem.js')
    productDAO = new ProductDAOFileSystem('products')
    console.log('Set FileSystem as Database for Products!')
    break
  case 'mongodb':
    const { default: ProductDAOMongoDB } = await import('./ProductDAO_MongoDB.js')
    productDAO = new ProductDAOMongoDB()
    console.log('Set MongoDB as Database for Products!')
    break
  case 'firebase':
    const { default: ProductDAOFirebase } = await import('./ProductDAO_Firebase.js')
    productDAO = new ProductDAOFirebase()
    console.log('Set Firebase as Database for Products!')
    break
  default:
    const { default: ProductDAOMemory } = await import('./ProductDAO_Memory.js')
    productDAO = new ProductDAOMemory()
    console.log('Set Internal Memory as Database for Products!')
    break
}

export { productDAO }
