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
        message: 'El id es requerido.',
        code: 'id_required',
        expected: true,
        status: 400,
      }

    if (typeof id !== 'string')
      throw {
        message: 'El id debe ser un string.',
        code: 'id_must_be_string',
        status: 400,
        expected: true,
      }

    this.#id = id
  }

  set password(password) {
    if (!password)
      throw {
        message: 'La contraseña es requerida.',
        code: 'password_required',
        expected: true,
        status: 400,
      }

    if (typeof password !== 'string')
      throw {
        message: 'La contraseña debe ser un string.',
        code: 'password_must_be_string',
        status: 400,
        expected: true,
      }

    this.#password = password
  }

  set email(email) {
    if (!email)
      throw {
        message: 'El correo electrónico es requerido.',
        code: 'email_required',
        expected: true,
        status: 400,
      }

    if (typeof email !== 'string')
      throw {
        message: 'El correo electrónico debe ser un string.',
        code: 'email_must_be_string',
        status: 400,
        expected: true,
      }

    this.#email = email
  }

  set first_name(first_name) {
    if (!first_name)
      throw {
        message: 'El nombre es requerido.',
        code: 'first_name_required',
        expected: true,
        status: 400,
      }

    if (typeof first_name !== 'string')
      throw {
        message: 'El nombre debe ser un string.',
        code: 'first_name_must_be_string',
        status: 400,
        expected: true,
      }

    this.#first_name = first_name
  }

  set last_name(last_name) {
    if (!last_name)
      throw {
        message: 'El apellido es requerido.',
        code: 'last_name_required',
        expected: true,
        status: 400,
      }

    if (typeof last_name !== 'string')
      throw {
        message: 'El apellido debe ser un string.',
        code: 'last_name_must_be_string',
        status: 400,
        expected: true,
      }

    this.#last_name = last_name
  }

  set phone(phone) {
    if (!phone)
      throw {
        message: 'El teléfono es requerido.',
        code: 'phone_required',
        expected: true,
        status: 400,
      }

    if (typeof phone !== 'string')
      throw {
        message: 'El teléfono debe ser un string.',
        code: 'phone_must_be_string',
        status: 400,
        expected: true,
      }

    this.#phone = phone
  }

  set image(image) {
    if (!image)
      throw {
        message: 'La imagen es requerida.',
        code: 'image_required',
        expected: true,
        status: 400,
      }

    if (typeof image !== 'string')
      throw {
        message: 'La imagen debe ser un string.',
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
