export default class CartModel {
  #id
  #products

  constructor(id) {
    this.#id = id
    this.#products = []
  }

  set id(id) {
    if (!id)
      throw {
        message: 'The cart ID field is required.',
        code: 'id_required',
        expected: true,
        status: 400,
      }

    if (typeof id !== 'string')
      throw {
        message: 'The ID must be a string.',
        code: 'id_must_be_string',
        status: 400,
        expected: true,
      }

    this.#id = id
  }

  get dto() {
    const newCart = {
      id: this.#id,
      products: this.#products,
    }

    return JSON.parse(JSON.stringify(newCart))
  }
}
