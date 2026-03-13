const mongoose = require("mongoose")
const Product = require("../models/Product")

mongoose.connect("mongodb+srv://harsh:harsh123@cluster0.ssctyc6.mongodb.net/?appName=Cluster0")

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
            { storage: "256GB", mrp: 134900, price: 127400, stock: 12 },
            { storage: "512GB", mrp: 154900, price: 147400, stock: 9 },
            { storage: "1TB", mrp: 174900, price: 167400, stock: 5 }
        ],
        emiPlans: [
            { monthlyPayment: 44967, tenure: 3, interestRate: "0%", cashback: 7500 },
            { monthlyPayment: 22483, tenure: 6, interestRate: "0%", cashback: 7500 },
            { monthlyPayment: 11242, tenure: 12, interestRate: "0%", cashback: 7500 },
            { monthlyPayment: 4297, tenure: 36, interestRate: "10.5%", cashback: 7500 }
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
            { storage: "256GB", mrp: 109999, price: 103999, stock: 20 },
            { storage: "512GB", mrp: 119999, price: 113999, stock: 11 }
        ],
        emiPlans: [
            { monthlyPayment: 38000, tenure: 3, interestRate: "0%", cashback: 6000 },
            { monthlyPayment: 19000, tenure: 6, interestRate: "0%", cashback: 6000 },
            { monthlyPayment: 9500, tenure: 12, interestRate: "0%", cashback: 6000 }
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
            { storage: "256GB", mrp: 49989, price: 46989, stock: 17 },
            { storage: "512GB", mrp: 53125, price: 50125, stock: 8 }
        ],
        emiPlans: [
            { monthlyPayment: 22000, tenure: 3, interestRate: "0%", cashback: 3000 },
            { monthlyPayment: 11000, tenure: 6, interestRate: "0%", cashback: 3000 },
            { monthlyPayment: 5500, tenure: 12, interestRate: "0%", cashback: 3000 }
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