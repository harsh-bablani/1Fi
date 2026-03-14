const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get all products (optionally filter by storage variant)
router.get("/products", async (req, res) => {
    try {
        const { storage } = req.query;

        if (storage) {
            // Filter products that include the requested storage variant
            const products = await Product.find({
                variants: { $elemMatch: { storage } }
            });

            // For filtered results, return the price/mrp adjusted to the selected storage variant
            const mapped = products.map((p) => {
                const asObj = p.toObject();
                const variant = asObj.variants.find(v => v.storage === storage);
                if (variant) {
                    asObj.price = variant.price;
                    asObj.mrp = variant.mrp;
                    asObj.selectedVariant = storage;
                    asObj.emiPlans = variant.emiPlans; // Use variant-specific EMI plans
                }
                return asObj;
            });

            return res.json(mapped);
        }

        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update pricing / stock for a specific storage variant (admin)
router.put("/products/:slug/variants/:storage", async (req, res) => {
    try {
        const { slug, storage } = req.params;
        const { price, mrp, stock } = req.body;

        const product = await Product.findOne({ slug });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const variant = product.variants.find(v => v.storage === storage);
        if (!variant) {
            return res.status(404).json({ message: "Variant not found" });
        }

        if (price !== undefined) variant.price = price;
        if (mrp !== undefined) variant.mrp = mrp;
        if (stock !== undefined) variant.stock = stock;

        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single product
router.get("/products/:slug", async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        res.json(product)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router;