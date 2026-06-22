import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./src/model/products.js";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1"])

dotenv.config();

const TOTAL_PRODUCTS = 200_000;
const BATCH_SIZE = 5000;

const categories = [
  "Electronics",
  "Books",
  "Clothing",
  "Sports",
  "Home",
  "Beauty",
];

async function seed() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    await Product.deleteMany({});

    for (let i = 0; i < TOTAL_PRODUCTS; i += BATCH_SIZE) {
      const products = [];

      for (let j = i; j < Math.min(i + BATCH_SIZE, TOTAL_PRODUCTS); j++) {
        products.push({
          name: `Product ${j + 1}`,
          category: categories[Math.floor(Math.random() * categories.length)],
          price: Number((Math.random() * 10000).toFixed(2)),
        });
      }
      await Product.insertMany(products);

      console.log(
        `Inserted ${Math.min(i + BATCH_SIZE, TOTAL_PRODUCTS)} products`,
      );
    }

    console.log("Seeding complete");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
