//----------* IMPORTS *----------//
import admin from 'firebase-admin'
import config from '../config.js'

//----------* FIREBASE CONNECTION *----------//
admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
})
const db = admin.firestore()

//----------* FIREBASE-CONTAINER CLASS *----------//
class FirebaseContainer {
  constructor(collectionName) {
    this.collection = db.collection(collectionName)
  }

  async readFile() {
    try {
      return JSON.parse(await fs.promises.readFile(`DB/${this.fileName}.json`, 'utf-8'))
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async writeFile(data) {
    try {
      fs.promises.writeFile(`DB/${this.fileName}.json`, JSON.stringify(data), 'utf-8')
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async getAll() {
    try {
      const allItems = await this.readFile()
      return allItems
    } catch (error) {
      await this.writeFile([])
      const allItems = await this.readFile()
      return allItems
    }
  }

  async getById(id) {
    try {
      const allItems = await this.readFile()
      const itemFound = allItems.find((item) => item.id === Number(id))
      return itemFound
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async addItem(object) {
    try {
      const allItems = await this.readFile()
      allItems.push(object)
      await this.writeFile(allItems)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async editById(object) {
    try {
      let allItems = await this.readFile()
      allItems = allItems.map((item) => (item.id !== object.id ? item : object))
      await this.writeFile(allItems)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async deleteById(id) {
    try {
      const allItems = await this.readFile()
      const filteredItemList = allItems.filter((item) => item.id !== Number(id))
      if (JSON.stringify(allItems) === JSON.stringify(filteredItemList)) {
        return false
      } else {
        await this.writeFile(filteredItemList)
        return true
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async deleteAll() {
    try {
      await this.writeFile([])
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async addItemInto(containerId, object) {
    try {
      let allItems = await this.readFile()
      let itemFound = allItems.find((item) => item.id === Number(containerId))
      itemFound.productos.push(object)
      allItems = allItems.map((item) => (item.id !== itemFound.id ? item : itemFound))
      await this.writeFile(allItems)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async removeItemFrom(containerId, objectId) {
    try {
      let allItems = await this.readFile()
      let itemFound = allItems.find((item) => item.id === Number(containerId))
      itemFound.productos = itemFound.productos.filter((item) => item.id !== Number(objectId))
      allItems = allItems.map((item) => (item.id !== itemFound.id ? item : itemFound))
      await this.writeFile(allItems)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async emptyContainer(containerId) {
    try {
      let allItems = await this.readFile()
      let itemFound = allItems.find((item) => item.id === Number(containerId))
      itemFound.productos = []
      allItems = allItems.map((item) => (item.id !== itemFound.id ? item : itemFound))
      await this.writeFile(allItems)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async borrarAll() {
    // version fea e ineficiente pero entendible para empezar
    try {
      const docs = await this.listarAll()
      const ids = docs.map((d) => d.id)
      const promesas = ids.map((id) => this.borrar(id))
      const resultados = await Promise.allSettled(promesas)
      const errores = resultados.filter((r) => r.status == 'rejected')
      if (errores.length > 0) {
        throw new Error('no se borró todo. volver a intentarlo')
      }
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`)
    }
  }

  async desconectar() {}
}

//----------* EXPORTS CLASS *----------//
export default FirebaseContainer
