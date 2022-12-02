import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		id: {
			type: String,
		},
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		price: {
			type: Number,
		},
		discountPercentage: {
			type: Number,
		},
		rating: {
			type: Number,
		},
		stock: {
			type: Number,
		},
		brand: {
			type: String,
		},
		category: {
			type: String,
		},
		thumbnail: {
			type: String,
		},
		images: {
			type: Array,
		},
		// name: {
		// 	type: String,
		// 	required: [true, "user name is mandatory"],
		// },
		// price: {
		// 	type: Number,
		// 	required: [true, "Price is required"],
		// },
	},
	{
		//If your are trying to send the json to the frontend
		// enable virtuals to send virtual json property to the res
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

//prductSchema.virtual("propety-name").get("CallbackFunction")
//It will have the access to the data which have beed fetched by other call

productSchema.virtual("price-range").get(function () {
	if (this.price > 150) return "Premium";
	else if (this.price > 70 && this.price <= 150) return "Mid Range";
	return "Low Range";
});

//QUERY Middleware

//before executing the query execute this portion
//It will get called only before the "findOne"/"findById" event occured
//findById is equvivalant to findOne({_id:value})
productSchema.pre("findOne", function (next) {
	console.log("Pre Middleware");
});

productSchema.post("findOne", function (document, next) {
	console.log("Post Middleware !!! ");
});

const Product = mongoose.model("products", productSchema);

export default Product;

//Reqular Expression pattern
//   /^find/
// ^ => means the begining
// find => is the patter
