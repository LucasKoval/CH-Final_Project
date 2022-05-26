import ContenedorMongoDb from '../../TempContainers/ContenedorMongoDb'

class PersonasDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super('personas', {
      id: { type: String, required: true },
      nombre: { type: String, required: true },
      apellido: { type: Number, required: true },
      edad: { type: Number, required: true },
    })
  }
}

export default PersonasDaoMongoDb
