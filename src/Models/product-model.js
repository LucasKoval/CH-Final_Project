export default class ProductModel {
  #name
  #description
  #image
  #price

  constructor({ name, description, image, price }) {
    this.name = name
    this.description = description
    this.image = image
    this.price = price
  }

  set name(name) {
    const MIN_LENGTH = 5

    if (!name)
      throw {
        message: 'The name is required.',
        code: 'name_required',
        expected: true,
        status: 400,
      }

    if (typeof name !== 'string')
      throw {
        message: 'The name must be a string.',
        code: 'name_must_be_string',
        status: 400,
        expected: true,
      }

    if (name.length < MIN_LENGTH)
      throw {
        message: `The name must have at least ${MIN_LENGTH} characters.`,
        code: 'invalid_name_length',
        expected: true,
        status: 400,
      }

    this.#name = name
  }

  set description(description) {
    const MIN_LENGTH = 10
    if (!description)
      throw {
        message: 'The description is required.',
        code: 'description_required',
        expected: true,
        status: 400,
      }
    if (description.length < MIN_LENGTH)
      throw {
        message: `The description must have at least ${MIN_LENGTH} characters.`,
        code: 'invalid_description_length',
        expected: true,
        status: 400,
      }
    this.#description = description
  }

  set image(image) {
    const MIN_LENGTH = 20
    if (!image)
      throw {
        message: 'The image is required.',
        code: 'image_required',
        expected: true,
        status: 400,
      }
    if (image.length < MIN_LENGTH)
      throw {
        message: `The image path must have at least ${MIN_LENGTH} characters.`,
        code: 'invalid_image_length',
        expected: true,
        status: 400,
      }

    const validExtensions = ['jpg', 'jpeg', 'png', 'gif']
    const extension = image.split('.').pop()
    if (!validExtensions.includes(extension))
      throw {
        message: 'The image must be jpg, jpeg, png or gif.',
        code: 'invalid_image_extension',
        expected: true,
        status: 400,
      }

    this.#image = image
  }

  set price(price) {
    const MIN_PRICE = 1

    if (!price)
      throw {
        message: 'The price is required.',
        code: 'price_required',
        expected: true,
        status: 400,
      }

    if (typeof price !== 'number')
      throw {
        message: 'The price must be a number.',
        code: 'price_must_be_number',
        status: 400,
        expected: true,
      }

    if (price < MIN_PRICE)
      throw {
        message: `The price must be greater than ${MIN_PRICE}.`,
        code: 'invalid_price',
        expected: true,
        status: 400,
      }
    this.#price = price
  }

  get dto() {
    const data = {
      name: this.#name,
      description: this.#description,
      image: this.#image,
      price: this.#price,
    }

    return JSON.parse(JSON.stringify(data))
  }
}
