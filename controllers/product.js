import dotenv from "dotenv";
import fs from "fs";
import slugify from "slugify";
import Product from "../models/productModel.js";

dotenv.config();

// const gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.BRAINTREE_MARCHANT_ID,
//   publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//   privateKey: process.env.BRAINTREE_PRIVATE_KEY,
// });

export const create = async (req, res) => {
  try {
    const { name, description, price, quantity, category, sold } = req.fields;
    const { photo } = req.files;
    //validation

    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
      case !price.trim():
        res.json({ error: "Price is required" });
      case !quantity.trim():
        res.json({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        res.json({ error: "Image should be less than 1MB in size" });
    }

    //create product
    const product = new Product({ ...req.fields, slug: slugify(name) });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const list = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const photo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "photo"
    );
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.productId
    ).select("-photo");

    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const update = async (req, res) => {
  try {
    const { name, description, price, quantity, sold, category } = req.fields;
    const { photo } = req.files;

    //validation

    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
      case !price.trim():
        res.json({ error: "Price is required" });
      case !quantity.trim():
        res.json({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        res.json({ error: "Image should be less than 1MB in size" });
    }

    //update product
    console.log(req.fields);
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const filteredProducts = async (req, res) => {
  try {
    const { checked } = req.body;

    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }

    const products = await Product.find(args);

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

export const relatedProducts = async (req, res) => {
  try {
    const { category } = req.body;

    const products = await Product.find({ category: category._id });

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

export const productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();

    res.json(total);
  } catch (error) {
    console.log(error);
  }
};

export const listProducts = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(8)

      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};
export const productSearch = async (req, res) => {
  try {
    const { keyword } = req.params;

    const result = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        {
          description: { $regex: keyword, $options: "i" },
        },
      ],
    }).select("-photo");

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

//braintree

// export const getToken = async (req, res) => {
//   try {
//     gateway.clientToken.generate({}, function (err, response) {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.send(response);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const processPayment = async (req, res) => {
//   try {
//     console.log(req.body);

//     let nonceFromTheClient = req.body.paymentMethodNonce;
//     let newTransaction = gateway.transaction.sale(
//       {
//         amount: "10.00",
//         paymentMethodNonce: nonceFromTheClient,
//         options: {
//           submitForSettlement: true,
//         },
//       },
//       function (err, result) {
//         if (result) {
//           res.send(result);
//         } else {
//           res.status(500).send(err);
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };
