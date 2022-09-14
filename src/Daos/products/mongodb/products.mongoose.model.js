import { mongoose } from "mongoose";

const mongooseProductModel = mongoose.model(
	"Product",
	{
		id: { type: String, required: true },
		name: { type: String, required: true },
		description: { type: String, required: true },
		image: { type: String, required: true },
		price: { type: Number, required: true },
	},
	"products"
);

export default mongooseProductModel;
