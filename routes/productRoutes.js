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

router.route("/welcome").get(welcome);
// router.route("/").get(getProduct).post(createProduct).delete(findOneAndDelete);
// temperay turned of createUser route cuz need to modify client's body of request
router.route("/").get(getProduct).delete(findOneAndDelete);
router.route("/filter").get(getProductByFiltering);
router.route("/single").get(findOneProduct);
router.route("/:id").get(getProductById).put(updateProductbyID);

export default router;

/** Different http methods
 * 	GET 	: To fetch data
 * 	POST	: To create data
 * 	PUT		: To update the whole record or entry.
 * 	PATCH 	: To update the patch of data from entry or document.
 * 	DELETE	: To remove/delete something
 */
