import app from "./app.js";
import "./config.js";
import mongoose from "mongoose";
import Product from "./models/productModel.js";

const path = process.env.PORT || 8080;

const dbConnection = process.env.DATABASE_CONNECTION_STRING.replace(
	"<password>",
	process.env.PASSWORD
);

mongoose.connect(dbConnection).then((res) => {
	console.log("Connection Established");
});

app.listen(path, () => {
	console.log(`Listnenig to the port ${path}`);
});
