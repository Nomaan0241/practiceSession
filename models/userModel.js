import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		requied: [true, "Name is required"],
	},
	email: {
		type: String,
		requied: [true, "Email is required"],
		unique: true,
	},
	password: {
		type: String,
		requied: [true, "Password is required"],
	},
	confirmPassword: {
		type: String,
		requied: [true, "Confirm password is required"],

		//validate requied validator which is a function that return if it is true or false.
		//validate field only workd  on either save method or create method.
		validate: {
			validator: function (el) {
				//this contain entire document
				return el === this.password;
			},
			message: "The password are not matching.",
		},
	},
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 1);
	this.confirmPassword = undefined;
	next();
});

userSchema.methods.validatePassword = async function (
	clientPassword,
	dbPassword
) {
	return await bcrypt.compare(clientPassword, dbPassword);
};

const User = mongoose.model("user", userSchema);

export default User;
