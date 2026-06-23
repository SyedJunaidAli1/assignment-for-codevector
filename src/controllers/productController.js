import Product from "../model/products.js";

// offset pagination
// export const getProducts = async (req, res) => {
//   try {
//     const query = {};
//     if (req.query.category) {
//       query.category = req.query.category;
//     }
//     let page = Number(req.query.page) || 1;
//     let limit = Number(req.query.limit) || 10;
//     let skip = (page - 1) * limit;
//     const products = await Product.find(query).skip(skip).limit(limit);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

//cursor pagination
export const getProducts = async (req, res) => {
  try {
    const query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }

    let limit = Number(req.query.limit) || 10;

    if (req.query.nextcursor) {
      query._id = {
        $lt: req.query.nextcursor,
      };
    }

    const products = await Product.find(query).sort({ _id: -1 }).limit(limit);

    const lastProduct = products[products.length - 1];
    const nextcursor = lastProduct?._id;

    res.status(200).json({ products, nextcursor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
