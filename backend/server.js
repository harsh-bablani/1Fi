const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const productRoutes = require("./routes/productRoutes")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://harsh:harsh123@cluster0.ssctyc6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    family: 4,
    serverSelectionTimeoutMS: 5000
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch(err => {
    console.error("\n❌ MONGODB CONNECTION ERROR ❌");
    console.error("This is likely an IP Whitelist error from MongoDB Atlas.");
    console.error("Please log in to MongoDB Atlas -> Network Access -> Add IP Address -> 'Allow Access From Anywhere' (0.0.0.0/0)");
    console.error(err.message);
});

app.get("/", (req, res) => {
    res.send("API Running")
})

app.use("/api", productRoutes)

app.listen(5000, () => {
    console.log("Server running on port 5000")
})