import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

ProductSchema.index({
  updatedAt: -1,
  _id: -1,
});

ProductSchema.index({
  category: 1,
  updatedAt: -1,
  _id: -1,
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
