let cartDAO

switch (process.env.DB_ENV) {
  case 'json':
    const { default: CartDAOFileSystem } = await import('./CartDAO_FileSystem.js')
    cartDAO = new CartDAOFileSystem('cart')
    console.log('Set FileSystem as Database for Carts!')
    break
  case 'mongodb':
    const { default: CartDAOMongoDB } = await import('./CartDAO_MongoDB.js')
    cartDAO = new CartDAOMongoDB()
    console.log('Set MongoDB as Database for Carts!')
    break
  case 'firebase':
    const { default: CartDAOFirebase } = await import('./CartDAO_Firebase.js')
    cartDAO = new CartDAOFirebase()
    console.log('Set Firebase as Database for Carts!')
    break
  default:
    const { default: CartDAOMemory } = await import('./CartDAO_Memory.js')
    cartDAO = new CartDAOMemory()
    console.log('Set Internal Memory as Database for Carts!')
    break
}

export { cartDAO }
