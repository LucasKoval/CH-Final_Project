let cartDAO

switch (process.env.DB) {
  case 'json':
    const { default: CartDAOFileSystem } = await import('./CartDAO_FileSystem.js')
    cartDAO = new CartDAOFileSystem('cart')
    break
  case 'mongodb':
    const { default: CartDAOMongoDB } = await import('./CartDAO_MongoDB.js')
    cartDAO = new CartDAOMongoDB()
    break
  case 'firebase':
    const { default: CartDAOFirebase } = await import('./CartDAO_Firebase.js')
    cartDAO = new CartDAOFirebase()
    break
  default:
    const { default: CartDAOMemory } = await import('./CartDAO_Memory.js')
    cartDAO = new CartDAOMemory()
    break
}

export { cartDAO }
