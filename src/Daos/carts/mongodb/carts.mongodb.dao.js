class CartsDaoMongodb {
	#mongooseCartModel;

	constructor(mongooseCartModel) {
		this.#mongooseCartModel = mongooseCartModel;
	}

	create = async (cart) => {
		try {
			const newCart = new this.#mongooseCartModel(cart);
			return await this.#mongooseCartModel.create(newCart);
		} catch (error) {
			throw error;
		}
	};

	getById = async (cartId) => {
		try {
			return await this.#mongooseCartModel.findOne({ id: cartId });
		} catch (error) {
			throw error;
		}
	};

	addProduct = async (cartId, product) => {
		try {
			return await this.#mongooseCartModel.findOneAndUpdate({ id: cartId }, { $push: { products: product } }, { new: true });
		} catch (error) {
			throw error;
		}
	};

	deleteProduct = async (cartId, productId) => {
		try {
			return await this.#mongooseCartModel.findOneAndUpdate({ id: cartId }, { $pull: { products: { id: productId } } });
		} catch (error) {
			throw error;
		}
	};

	deleteAllProducts = async (cartId) => {
		try {
			return await this.#mongooseCartModel.findOneAndUpdate({ id: cartId }, { $set: { products: [] } });
		} catch (error) {
			throw error;
		}
	};
}

export default CartsDaoMongodb;
