//----------* MEMORY-CONTAINER CLASS *----------//
class MemoryContainer {
  constructor() {
    this.elements = []
  }

  getAll() {
    return [...this.elements]
  }

  getById(id) {
    const itemFound = this.elements.find((item) => item.id === Number(id))
    if (!itemFound) {
      throw new Error(`Error: item with ID ${id} not found.`)
    } else {
      return itemFound
    }
  }

  addItem(object) {
    this.elements.push(object)
    return [...this.elements]
  }

  editById(object) {
    this.elements = this.elements.map((item) => (item.id !== object.id ? item : object))
    return [...this.elements]
  }

  deleteById(id) {
    const filteredItemList = this.elements.filter((item) => item.id !== Number(id))
    if (JSON.stringify(this.elements) === JSON.stringify(filteredItemList)) {
      return false
    } else {
      this.elements = filteredItemList
      return true
    }
  }

  deleteAll() {
    this.elements = []
  }

  addItemInto(containerId, object) {
    let itemFound = this.elements.find((item) => item.id === Number(containerId))
    itemFound.productos.push(object)
    this.elements = this.elements.map((item) => (item.id !== itemFound.id ? item : itemFound))
  }

  removeItemFrom(containerId, objectId) {
    let itemFound = this.elements.find((item) => item.id === Number(containerId))
    itemFound.productos = itemFound.productos.filter((item) => item.id !== Number(objectId))
    this.elements = this.elements.map((item) => (item.id !== itemFound.id ? item : itemFound))
  }

  emptyContainer(containerId) {
    let itemFound = this.elements.find((item) => item.id === Number(containerId))
    itemFound.productos = []
    this.elements = this.elements.map((item) => (item.id !== itemFound.id ? item : itemFound))
  }
}

//----------* EXPORTS CLASS *----------//
export default MemoryContainer
