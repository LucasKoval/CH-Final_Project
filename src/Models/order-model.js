export default class OrderModel {
  #id
  #date
  #userId
  #first_name
  #last_name
  #email
  #phone
  #image
  #products

  constructor(idGenerator, { id: userId, first_name, last_name, email, phone, image }, products) {
    this.id = idGenerator()
    this.date = new Date().getTime()
    this.userId = userId
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.image = image
    this.products = products
  }

  set id(id) {
    if (!id)
      throw {
        message: 'The order ID is required.',
        code: 'id_required',
        expected: true,
        status: 400,
      }

    if (typeof id !== 'string')
      throw {
        message: 'The order ID must be a string.',
        code: 'id_must_be_string',
        status: 400,
        expected: true,
      }

    this.#id = id
  }

  set date(date) {
    if (!date)
      throw {
        message: 'The order date is required.',
        code: 'order_date_required',
        expected: true,
        status: 400,
      }

    if (typeof date !== 'number')
      throw {
        message: 'The order date must be a number.',
        code: 'order_date_must_be_number',
        status: 400,
        expected: true,
      }

    this.#date = date
  }

  set userId(userId) {
    console.log({ userId })
    if (!userId)
      throw {
        message: 'The client ID in the order is required.',
        code: 'userId_required',
        expected: true,
        status: 400,
      }

    if (typeof userId !== 'string')
      throw {
        message: 'The client ID in the order must be a string.',
        code: 'userId_must_be_string',
        status: 400,
        expected: true,
      }

    this.#userId = userId
  }

  set first_name(first_name) {
    if (!first_name)
      throw {
        message: 'The name in the order is required.',
        code: 'first_name_required',
        expected: true,
        status: 400,
      }

    if (typeof first_name !== 'string')
      throw {
        message: 'The name in the order must be a string.',
        code: 'first_name_must_be_string',
        status: 400,
        expected: true,
      }

    this.#first_name = first_name
  }

  set last_name(last_name) {
    if (!last_name)
      throw {
        message: 'The last name on the order is required.',
        code: 'last_name_required',
        expected: true,
        status: 400,
      }

    if (typeof last_name !== 'string')
      throw {
        message: 'The last name in the order must be a string.',
        code: 'last_name_must_be_string',
        status: 400,
        expected: true,
      }

    this.#last_name = last_name
  }

  set email(email) {
    if (!email)
      throw {
        message: 'The email in the order is required.',
        code: 'email_required',
        expected: true,
        status: 400,
      }

    if (typeof email !== 'string')
      throw {
        message: 'The email in the order must be a string.',
        code: 'email_must_be_string',
        status: 400,
        expected: true,
      }

    this.#email = email
  }

  set phone(phone) {
    if (!phone)
      throw {
        message: 'The phone in the order is required.',
        code: 'phone_required',
        expected: true,
        status: 400,
      }

    if (typeof phone !== 'string')
      throw {
        message: 'The phone in the order must be a string.',
        code: 'phone_must_be_string',
        status: 400,
        expected: true,
      }

    this.#phone = phone
  }

  set image(image) {
    if (!image)
      throw {
        message: 'The image in the order is required.',
        code: 'image_required',
        expected: true,
        status: 400,
      }

    if (typeof image !== 'string')
      throw {
        message: 'The image in the order must be a string.',
        code: 'image_must_be_string',
        status: 400,
        expected: true,
      }

    this.#image = image
  }

  set products(products) {
    if (!products)
      throw {
        message: 'The products on the order are required.',
        code: 'order_products_required',
        expected: true,
        status: 400,
      }

    if (!Array.isArray(products))
      throw {
        message: 'The products in the order must be an array.',
        code: 'order_products_must_be_array',
        status: 400,
        expected: true,
      }

    this.#products = products
  }

  get dto() {
    const data = {
      id: this.#id,
      date: this.#date,
      userId: this.#userId,
      first_name: this.#first_name,
      last_name: this.#last_name,
      email: this.#email,
      phone: this.#phone,
      image: this.#image,
      products: this.#products,
    }

    return JSON.parse(JSON.stringify(data))
  }
}
