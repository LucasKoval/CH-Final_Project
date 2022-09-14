class ProductsDaoMongodb {
	#mongooseProductModel;

	constructor(mongooseProductModel) {
		this.#mongooseProductModel = mongooseProductModel;
	}

	create = async (product) => {
		try {
			const newProduct = new this.#mongooseProductModel(product);
			return await this.#mongooseProductModel.create(newProduct);
		} catch (error) {
			throw error;
		}
	};

	getAll = async () => {
		try {
			return await this.#mongooseProductModel.find();
		} catch (error) {
			throw error;
		}
	};

	getById = async (productId) => {
		try {
			return await this.#mongooseProductModel.findOne({ id: productId });
		} catch (error) {
			throw error;
		}
	};

	updateById = async (productId, productData) => {
		try {
			return await this.#mongooseProductModel.findOneAndUpdate({ id: productId }, productData, { new: true });
		} catch (error) {
			throw error;
		}
	};

	deleteById = async (productId) => {
		try {
			return await this.#mongooseProductModel.findOneAndDelete({ id: productId });
		} catch (error) {
			throw error;
		}
	};
}

export default ProductsDaoMongodb;
