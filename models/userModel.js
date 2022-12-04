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
	passwordChangedTimeStamp: Date,
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 1);
	this.passwordChangedTimeStamp = Date.now() - 1000;
	this.confirmPassword = undefined;
	next();
});

userSchema.methods.validatePassword = async function (
	clientPassword,
	dbPassword
) {
	return await bcrypt.compare(clientPassword, dbPassword);
};

/** What if we signed in from two devices and we changed the password from the
 * sconded device. The first device should not be able to access anything or
 * perform any action.
 * To implement that we added passwordChangedTime in model
 * Compare it with token issued time .
 * The user shuld always be created first then the token shuld be generated.
 * means tokenIssue time must be greated than password changed time
 */
userSchema.methods.tokenPasswordValidation = function (tokenIssueDate) {
	if (this.passwordChangedTimeStamp) {
		const passwordChanged = Math.floor(
			this.passwordChangedTimeStamp.getTime() / 1000
		);
		return tokenIssueDate > passwordChanged;
	}
};

const User = mongoose.model("user", userSchema);

export default User;
