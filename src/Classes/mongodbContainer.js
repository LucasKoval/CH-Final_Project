//----------* IMPORTS *----------//
import mongoose from 'mongoose'
import config from '../config.js'

//----------* MONGOOSE CONNECTION *----------//
try {
  await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options, () =>
    console.log('Mongoose is connected!')
  )
} catch (error) {
  console.log('Mongoose could not connect.')
}
const dbConnection = mongoose.connection
dbConnection.on('error', (error) => console.log(`Connection error: ${error}`))
dbConnection.once('open', () => console.log('Connected to DB!'))

//----------* MONGODB-CONTAINER CLASS *----------//
class MongoDBContainer {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema)
  }

  async getAll() {
    try {
      const allItems = await this.collection.find({})
      return allItems
    } catch (error) {
      throw new Error(`Error getting all items: ${error}`)
    }
  }

  async getById(id) {
    try {
      const itemFound = await this.collection.find({ id: Number(id) })
      return itemFound
    } catch (error) {
      throw new Error(`Error getting item: ${error}`)
    }
  }

  async addItem(object) {
    try {
      await this.collection.create(object)
    } catch (error) {
      throw new Error(`Error adding item: ${error}`)
    }
  }

  async editById(object, id) {
    try {
      await this.collection.updateOne(
        {
          id: id,
        },
        { $set: object }
      )
    } catch (error) {
      throw new Error(`Error editing item: ${error}`)
    }
  }

  async deleteById(id) {
    try {
      const itemFound = await this.collection.find({ id: Number(id) })
      if (itemFound && itemFound.length) {
        await this.collection.deleteOne({
          id: id,
        })
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new Error(`Error deleting item: ${error}`)
    }
  }

  async deleteAll() {
    try {
      await this.collection.deleteMany({})
    } catch (error) {
      throw new Error(`Error deleting all items: ${error}`)
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
}

//----------* EXPORTS CLASS *----------//
export default MongoDBContainer
