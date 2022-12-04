import User from "../models/userModel.js";
import catchApiErrors from "../utils/catchApiErrors.js";
import { filterResponse } from "../utils/commonUtils.js";
import jwt from "jsonwebtoken";
import AbstractApplicationError from "../utils/AbstarctApplicationError.js";

const signUp = catchApiErrors(async (req, res, next) => {
	const user = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
	});

	const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY_JWT, {
		expiresIn: process.env.SECRET_EXPIRY_JWT,
	});

	const finalResult = filterResponse(user, "name", "email");

	res.status(201).json({
		message: "success",
		token,
		data: finalResult,
	});
});

const signIn = catchApiErrors(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password)
		return next(new AbstractApplicationError("Creadantials not provided", 400));

	const user = await User.findOne({ email });

	if (!user || !(await user.validatePassword(password, user.password))) {
		return next(new AbstractApplicationError("Credentials are not valid", 401));
	}

	const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY_JWT, {
		expiresIn: process.env.SECRET_EXPIRY_JWT,
	});

	res.status(201).json({
		message: "success",
		token,
	});
});

const authenticateUser = catchApiErrors(async (req, res, next) => {
	let token = "";
	if (req.headers.authorization.startsWith("Bearer")) {
		token = req.headers?.authorization?.split(" ")[1];
	}

	if (!token) return next(new AbstractApplicationError("Not Authorized", 401));

	const verifyToken = await jwt.verify(token, process.env.SECRET_KEY_JWT);

	const user = await User.findById(verifyToken.id);

	if (!user)
		return next(new AbstractApplicationError("User does not exist", 401));

	req.user = user;

	console.log(user);
	next();
});

export { signUp, signIn, authenticateUser };

48.2;
