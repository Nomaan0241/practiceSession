import User from "../models/userModel.js";
import catchApiErrors from "../utils/catchApiErrors.js";
import { filterResponse } from "../utils/commonUtils.js";

const signUp = catchApiErrors(async (req, res, next) => {
	const user = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
	});

	const finalResult = filterResponse(user, "name", "email");

	res.status(201).json({
		message: "success",
		data: finalResult,
	});
});

export { signUp };

1.5;
