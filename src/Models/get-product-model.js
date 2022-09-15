export default class GetProductModel {
  constructor(products) {
    this.products = products
  }

  get allProductsDto() {
    const products = this.products.map((product) => {
      const { name, description, image, price, stock, id } = product
      return { id, name, description, image, price, stock }
    })
    return JSON.parse(JSON.stringify(products))
  }

  get oneProductDto() {
    const { name, description, image, price, stock, id } = this.products
    const product = { id, name, description, image, price, stock }
    return JSON.parse(JSON.stringify(product))
  }
}
