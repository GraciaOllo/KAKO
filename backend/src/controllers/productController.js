import Product from "../models/Product.js";
import path from "path";
import fs from "fs";

// @desc    Créer un produit (vendeur)
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, condition, stock, location } =
      req.body;

    const images = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    const product = await Product.create({
      title,
      description,
      price: Number(price),
      category,
      condition,
      stock: stock ? Number(stock) : 1,
      location: location || "Yaoundé",
      images,
      seller: req.user.id,
      status: "en_moderation",
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Liste des produits du vendeur connecté
// @route   GET /api/products/mine/list
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Un produit par ID
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email"
    );
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Modifier un produit (propriétaire uniquement)
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    if (product.seller.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Non autorisé" });
    }

    // Nouvelles images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((f) => `/uploads/${f.filename}`);
      product.images = [...product.images, ...newImages];
    }

    const fields = [
      "title",
      "description",
      "price",
      "category",
      "condition",
      "stock",
      "location",
      "status",
    ];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] =
          field === "price" || field === "stock"
            ? Number(req.body[field])
            : req.body[field];
      }
    });

    // Remettre en modération si modification importante
    if (req.body.title || req.body.description || req.body.price) {
      product.status = "en_moderation";
    }

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Supprimer un produit
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    if (product.seller.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Non autorisé" });
    }

    // Supprimer les fichiers images
    product.images.forEach((imgPath) => {
      const fullPath = path.join(process.cwd(), imgPath.replace(/^\//, ""));
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });

    await product.deleteOne();
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Tous les produits publics (approuvés)
// @route   GET /api/products
export const getAllProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    const query = { status: "approuve" };

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query)
      .populate("seller", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      page: Number(page),
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
