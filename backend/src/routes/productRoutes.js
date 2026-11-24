import express from "express";
import {
  createProduct,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { protect, sellerOnly } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Vendeur authentifié
router.post(
  "/",
  protect,
  sellerOnly,
  upload.array("images", 5),
  createProduct
);
router.get("/mine/list", protect, sellerOnly, getMyProducts);
router.put(
  "/:id",
  protect,
  sellerOnly,
  upload.array("images", 5),
  updateProduct
);
router.delete("/:id", protect, sellerOnly, deleteProduct);

export default router;
