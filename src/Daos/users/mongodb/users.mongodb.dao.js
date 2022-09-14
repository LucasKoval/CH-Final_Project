class UsersDaoMongodb {
	#mongooseUserModel;

	constructor(mongooseUserModel) {
		this.#mongooseUserModel = mongooseUserModel;
	}

	create = async (user) => {
		try {
			const newUser = new this.#mongooseUserModel(user);
			return await this.#mongooseUserModel.create(newUser);
		} catch (error) {
			throw error;
		}
	};

	getByEmail = async (email) => {
		try {
			return await this.#mongooseUserModel.findOne({ email });
		} catch (error) {
			throw error;
		}
	};
}

export default UsersDaoMongodb;
