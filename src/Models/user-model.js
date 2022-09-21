export default class UserModel {
  #id
  #password
  #email
  #first_name
  #last_name
  #phone
  #image
  #encryptPassword

  constructor(
    idGenerator,
    encryptPassword,
    { password, email, first_name, last_name, phone, image }
  ) {
    this.id = idGenerator()
    this.password = password
    this.email = email
    this.first_name = first_name
    this.last_name = last_name
    this.phone = phone
    this.image = image
    this.#encryptPassword = encryptPassword
  }

  set id(id) {
    if (!id)
      throw {
        message: 'The ID is required.',
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

  set password(password) {
    if (!password)
      throw {
        message: 'The password is required.',
        code: 'password_required',
        expected: true,
        status: 400,
      }

    if (typeof password !== 'string')
      throw {
        message: 'The password must be a string.',
        code: 'password_must_be_string',
        status: 400,
        expected: true,
      }

    this.#password = password
  }

  set email(email) {
    if (!email)
      throw {
        message: 'The email is required.',
        code: 'email_required',
        expected: true,
        status: 400,
      }

    if (typeof email !== 'string')
      throw {
        message: 'The email must be a string.',
        code: 'email_must_be_string',
        status: 400,
        expected: true,
      }

    this.#email = email
  }

  set first_name(first_name) {
    if (!first_name)
      throw {
        message: 'The name is required.',
        code: 'first_name_required',
        expected: true,
        status: 400,
      }

    if (typeof first_name !== 'string')
      throw {
        message: 'The name must be a string.',
        code: 'first_name_must_be_string',
        status: 400,
        expected: true,
      }

    this.#first_name = first_name
  }

  set last_name(last_name) {
    if (!last_name)
      throw {
        message: 'The last name is required.',
        code: 'last_name_required',
        expected: true,
        status: 400,
      }

    if (typeof last_name !== 'string')
      throw {
        message: 'The last name must be a string.',
        code: 'last_name_must_be_string',
        status: 400,
        expected: true,
      }

    this.#last_name = last_name
  }

  set phone(phone) {
    if (!phone)
      throw {
        message: 'The phone is required.',
        code: 'phone_required',
        expected: true,
        status: 400,
      }

    if (typeof phone !== 'string')
      throw {
        message: 'The phone must be a string.',
        code: 'phone_must_be_string',
        status: 400,
        expected: true,
      }

    this.#phone = phone
  }

  set image(image) {
    if (!image)
      throw {
        message: 'The image is required.',
        code: 'image_required',
        expected: true,
        status: 400,
      }

    if (typeof image !== 'string')
      throw {
        message: 'The image must be a string.',
        code: 'image_must_be_string',
        status: 400,
        expected: true,
      }

    this.#image = image
  }

  dto = async () => {
    const data = {
      id: this.#id,
      first_name: this.#first_name,
      last_name: this.#last_name,
      email: this.#email,
      password: await this.#encryptPassword(this.#password),
      phone: this.#phone,
      image: this.#image,
    }

    return JSON.parse(JSON.stringify(data))
  }
}
