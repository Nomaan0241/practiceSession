import { authenticateUser } from "../controllers/authenticationController.js";

import express from "express";
import {
	welcome,
	createProduct,
	getProduct,
	getProductById,
	updateProductbyID,
	findOneProduct,
	findOneAndDelete,
	getProductByFiltering,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/welcome").get(authenticateUser, welcome);
// router.route("/").get(getProduct).post(createProduct).delete(findOneAndDelete);
// temperay turned of createUser route cuz need to modify client's body of request
router
	.route("/")
	.get(authenticateUser, getProduct)
	.delete(authenticateUser, findOneAndDelete);
router.route("/filter").get(authenticateUser, getProductByFiltering);
router.route("/single").get(authenticateUser, findOneProduct);
router
	.route("/:id")
	.get(authenticateUser, getProductById)
	.put(authenticateUser, updateProductbyID);

export default router;

/** Different http methods
 * 	GET 	: To fetch data
 * 	POST	: To create data
 * 	PUT		: To update the whole record or entry.
 * 	PATCH 	: To update the patch of data from entry or document.
 * 	DELETE	: To remove/delete something
 */
