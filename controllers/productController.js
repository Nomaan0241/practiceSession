import Product from "../models/productModel.js";
import AbstractOptions from "../utils/AbstractOptions.js";
import catchApiErrors from "../utils/catchApiErrors.js";

const welcome = (req, res) => {
	res.status(200).json({
		status: "success",
		body: "Welcome User",
	});
};

const createProduct = async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json({
			status: "success",
			data: product,
		});
	} catch (err) {
		res.status(500).json({
			satus: "failure",
			data: err,
		});
	}
};

const getProduct = catchApiErrors(async (req, res, next) => {
	const product = await Product.find();
	res.status(200).json({
		status: "success",
		result: product.length,
		data: product,
	});
});

const getProductById = catchApiErrors(async (req, res) => {
	const product = await Product.findById(req.params.id);

	//we can increament __v field in db. by using follwing to lines
	product.increment();
	await product.save();

	res.status(200).json({
		status: "success",
		lenght: product.lenght,
		data: product,
	});
});

const updateProductbyID = catchApiErrors(async (req, res) => {
	//{new:true} parameter is used to return the updated record to response
	const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json({
		status: "success",
		lenght: product.lenght,
		data: product,
	});
});

const findOneProduct = catchApiErrors(async (req, res) => {
	//console.log(req.params);
	const product = await Product.findOne(req.query);

	res.status(200).json({
		status: "success",
		lenght: product.lenght,
		data: product,
	});
});

const findOneAndDelete = catchApiErrors(async (req, res) => {
	// console.log(req.params);
	const product = await Product.findOneAndDelete(req.query);

	res.status(200).json({
		status: "success",
		lenght: product.lenght,
		data: product,
	});
});

const getProductByFiltering = catchApiErrors(async (req, res) => {
	let query = Product.find();

	//All the extra logic is extracted to the utils so that it can become reusable
	const options = new AbstractOptions(query, req.query);
	options.filter().sort().pagination().setFields();

	//query is promise and it get executed only if await is used in that line.
	const product = await query;
	// const product = await Product.find(JSON.parse(queryString));

	res.status(200).json({
		status: "success",
		length: product.length,
		data: product,
	});
});

const getAggrigate = catchApiErrors(async (req, res) => {
	//We can reacte pipline of queries in a way that next query gets the output of previose query and so on
	const aggrigate = await Product.aggregate([
		{
			$match: {
				price: {
					$lt: 1000,
					$gt: 50,
				},
			},
		},
		{
			$group: {
				_id: null,
				totalPrice: { $sum: "$price" },
				//totalPrice is variable which contains sum of price
				avgRating: { $avg: "$price" },
				count: { $sum: "$price" },
				minPrice: { $min: "$price" },
				maxPrice: { $max: "$price" },
			},
		},
	]);

	res.status(200).json({
		status: "success",
		result: product.length,
		data: product,
	});
});

export {
	welcome,
	createProduct,
	getProduct,
	getProductById,
	updateProductbyID,
	findOneProduct,
	findOneAndDelete,
	getProductByFiltering,
};

//this is test command
