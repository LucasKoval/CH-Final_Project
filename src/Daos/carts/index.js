import config from "../../config.js";

let cartsDao;

switch (config.persistence) {
	case "mongodb":
		const { default: CartsDaoMongodb } = await import("./mongodb/carts.mongodb.dao.js");
		const { default: mongooseCartModel } = await import("./mongodb/carts.mongoose.model.js");
		cartsDao = new CartsDaoMongodb(mongooseCartModel);
		break;
	default:
		throw {
			message: `Persistencia ${config.persistence} no implementada.`,
			code: "persistence_not_implemented",
			expected: true,
			status: 500,
		};
}

export { cartsDao };
