import express from "express";
import formidable from "express-formidable";
import {
  create,
  filteredProducts,
  list,
  listProducts,
  photo,
  productsCount,
  productSearch,
  read,
  relatedProducts,
  remove,
  update,
} from "../controllers/product.js";
import { isAdmin, requireSignin } from "../middlewares/auth.js";
const router = express.Router();

router.post("/product", requireSignin, isAdmin, formidable(), create);

router.get("/products", list);
router.get("/products/:slug", read);
router.get("/product/photo/:productId", photo);
router.delete("/product/:productId", requireSignin, isAdmin, remove);
router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);
router.post("/filtered-products", filteredProducts);
router.post("/related-products", relatedProducts);
router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);
router.get("/products/search/:keyword", productSearch);

// router.get("/braintree/token", getToken);
// router.post("/braintree/payment", processPayment);

export default router;
