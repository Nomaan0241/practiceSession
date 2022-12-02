import express from "express";
import productRoutes from "./routes/productRoutes.js";
import morgan, { format } from "morgan";
import applicationErrors from "./controllers/errorHandleController.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(morgan("dev"));
//morgan is npm package that shows the information about all the api requests made
//from the server.

app.use(express.json());

// app.use((req, res) => {
// 	console.log(req.query);
// });
app.use("/api/v2/product", productRoutes);
app.use("/api/v2/user", userRoutes);
app.use(applicationErrors);
export default app;
