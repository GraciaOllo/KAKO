import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est obligatoire"],
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: [true, "La description est obligatoire"],
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: [true, "Le prix est obligatoire"],
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Électronique",
        "Mode",
        "Maison",
        "Sport",
        "Véhicules",
        "Autres",
      ],
    },
    condition: {
      type: String,
      required: true,
      enum: ["Neuf", "Comme neuf", "Bon état", "Correct"],
    },
    images: [
      {
        type: String, // chemin relatif /uploads/...
      },
    ],
    stock: {
      type: Number,
      default: 1,
      min: 0,
    },
    status: {
      type: String,
      enum: ["brouillon", "en_moderation", "approuve", "rejete", "vendu"],
      default: "en_moderation",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      default: "Yaoundé",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
