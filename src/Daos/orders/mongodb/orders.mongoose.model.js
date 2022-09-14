import { mongoose } from "mongoose";

const mongooseUserModel = mongoose.model(
	"Order",
	{
		id: { type: String, required: true },
		userId: { type: String, required: true },
		email: { type: String, required: true },
		date: { type: Number, required: true },
		products: { type: Array, required: true },
	},
	"orders"
);

export default mongooseUserModel;
