import { mongoose } from "mongoose";

const mongooseCartModel = mongoose.model(
	"Cart",
	{
		id: { type: String, required: true },
		products: { type: Array, required: true },
	},
	"carts"
);

export default mongooseCartModel;
