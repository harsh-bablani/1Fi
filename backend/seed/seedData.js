require("dotenv").config();
const mongoose = require("mongoose")
const Product = require("../models/Product")

const seedUri = process.env.MONGODB_URI || "mongodb+srv://harsh:harsh123@cluster0.ssctyc6.mongodb.net/1fi?retryWrites=true&w=majority";
mongoose.connect(seedUri)

const products = [
    {
        name: "iPhone 17 Pro",
        slug: "iphone-17-pro",
        variant: "256GB",
        mrp: 134900,
        price: 127400,
        image: "/iphone.jpg",
        colors: ["orange", "silver", "blue"],
        colorImages: [
            { color: "orange", image: "/iphone orange.jpg" },
            { color: "silver", image: "/iphone.jpg" },
            { color: "blue", image: "/iphone blue.jpg" }
        ],
        variants: [
            {
                storage: "256GB",
                mrp: 134900,
                price: 127400,
                stock: 12,
                emiPlans: [
                    { monthlyPayment: 42467, tenure: 3, interestRate: "0%", cashback: 7500 },
                    { monthlyPayment: 21233, tenure: 6, interestRate: "0%", cashback: 7500 },
                    { monthlyPayment: 10617, tenure: 12, interestRate: "0%", cashback: 7500 },
                    { monthlyPayment: 4070, tenure: 36, interestRate: "10.5%", cashback: 7500 }
                ]
            },
            {
                storage: "512GB",
                mrp: 154900,
                price: 147400,
                stock: 9,
                emiPlans: [
                    { monthlyPayment: 49133, tenure: 3, interestRate: "0%", cashback: 7500 },
                    { monthlyPayment: 24567, tenure: 6, interestRate: "0%", cashback: 7500 },
                    { monthlyPayment: 12283, tenure: 12, interestRate: "0%", cashback: 7500 },
                    { monthlyPayment: 4697, tenure: 36, interestRate: "10.5%", cashback: 7500 }
                ]
            },
            {
                storage: "1TB",
                mrp: 174900,
                price: 167400,
                stock: 5,
                emiPlans: [
                    { monthlyPayment: 55800, tenure: 3, interestRate: "0%", cashback: 7500 },
                    { monthlyPayment: 27900, tenure: 6, interestRate: "0%", cashback: 7500 },
                    { monthlyPayment: 13950, tenure: 12, interestRate: "0%", cashback: 7500 },
                    { monthlyPayment: 5324, tenure: 36, interestRate: "10.5%", cashback: 7500 }
                ]
            }
        ]
    },
    {
        name: "Samsung S24 Ultra",
        slug: "samsung-s24-ultra",
        variant: "256GB",
        mrp: 109999,
        price: 103999,
        image: "/sam.webp",
        colors: ["black", "gray"],
        colorImages: [
            { color: "black", image: "/sam.webp" },
            { color: "gray", image: "/samsung grey.jpg" }
        ],
        variants: [
            {
                storage: "256GB",
                mrp: 109999,
                price: 103999,
                stock: 20,
                emiPlans: [
                    { monthlyPayment: 34666, tenure: 3, interestRate: "0%", cashback: 6000 },
                    { monthlyPayment: 17333, tenure: 6, interestRate: "0%", cashback: 6000 },
                    { monthlyPayment: 8667, tenure: 12, interestRate: "0%", cashback: 6000 }
                ]
            },
            {
                storage: "512GB",
                mrp: 119999,
                price: 113999,
                stock: 11,
                emiPlans: [
                    { monthlyPayment: 38000, tenure: 3, interestRate: "0%", cashback: 6000 },
                    { monthlyPayment: 19000, tenure: 6, interestRate: "0%", cashback: 6000 },
                    { monthlyPayment: 9500, tenure: 12, interestRate: "0%", cashback: 6000 }
                ]
            }
        ]
    },
    {
        name: "OnePlus 12",
        slug: "oneplus-12",
        variant: "256GB",
        mrp: 49989,
        price: 46989,
        image: "/oneplus.jpg",
        colors: ["green", "black"],
        colorImages: [
            { color: "green", image: "/oneplus.jpg" },
            { color: "black", image: "/oneplus black.jpg" }
        ],
        variants: [
            {
                storage: "256GB",
                mrp: 49989,
                price: 46989,
                stock: 17,
                emiPlans: [
                    { monthlyPayment: 15663, tenure: 3, interestRate: "0%", cashback: 3000 },
                    { monthlyPayment: 7832, tenure: 6, interestRate: "0%", cashback: 3000 },
                    { monthlyPayment: 3916, tenure: 12, interestRate: "0%", cashback: 3000 }
                ]
            },
            {
                storage: "512GB",
                mrp: 53125,
                price: 50125,
                stock: 8,
                emiPlans: [
                    { monthlyPayment: 16708, tenure: 3, interestRate: "0%", cashback: 3000 },
                    { monthlyPayment: 8354, tenure: 6, interestRate: "0%", cashback: 3000 },
                    { monthlyPayment: 4177, tenure: 12, interestRate: "0%", cashback: 3000 }
                ]
            }
        ]
    }
]

async function seed() {
    await Product.deleteMany({})
    await Product.insertMany(products)

    console.log("Database Seeded")
    process.exit()
}

seed()