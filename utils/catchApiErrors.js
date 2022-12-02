const catchApiErrors = (fn) => (req, res, next) => {
	// fn(req, res, next).catch((error) => next(error));
	//directly pass next so it wil get executed in errorHandlerController
	fn(req, res, next).catch(next);
};

// catchApiErrors(async (req, res, next) => {
// 	const product = await Product.fin();
// 	res.status(200).json({
// 		status: "success",
// 		result: product.length,
// 		data: product,
// 	});
// });

export default catchApiErrors;
