import ContenedorArchivo from '../../TempContainers/ContenedorArchivo'

class PersonasDaoArchivo extends ContenedorArchivo {
  constructor(rutaDir) {
    super(`${rutaDir}/personas.json`)
  }
}

export default PersonasDaoArchivo
