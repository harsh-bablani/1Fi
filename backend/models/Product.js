const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    // Legacy single-variant fields (kept for backward compatibility)
    variant: String,
    price: { type: Number, required: true },
    mrp: Number,
    // New: support multiple storage variants with different pricing
    variants: [
        {
            storage: { type: String, required: true },
            price: { type: Number, required: true },
            mrp: { type: Number, required: true },
            stock: { type: Number, default: 0 }
        }
    ],
    image: String,
    colors: [String],
    colorImages: [
        {
            color: { type: String, required: true },
            image: { type: String, required: true }
        }
    ],
    emiPlans: [
        {
            monthlyPayment: Number,
            tenure: Number,
            interestRate: String,
            cashback: Number
        }
    ]
});

module.exports = mongoose.model("Product", productSchema);