class OrdersDaoMongodb {
  #mongooseOrderModel

  constructor(mongooseOrderModel) {
    this.#mongooseOrderModel = mongooseOrderModel
  }

  create = async (order) => {
    try {
      return await this.#mongooseOrderModel.create(order)
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  getAll = async (userId) => {
    try {
      console.log({ userId })
      return await this.#mongooseOrderModel.find({ userId })
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
}

export default OrdersDaoMongodb
