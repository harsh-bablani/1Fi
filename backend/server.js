const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const productRoutes = require("./routes/productRoutes")

const app = express()

app.use(cors())
app.use(express.json())

const mongoUrl = process.env.MONGODB_URI || "mongodb+srv://harsh:harsh123@cluster0.ssctyc6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl, {
    family: 4,
    serverSelectionTimeoutMS: 5000
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch(err => {
    console.error("\n❌ MONGODB CONNECTION ERROR ❌");
    console.error("Please verify your MongoDB connection string and network access settings.");
    console.error(err.message);
});

app.get("/", (req, res) => {
    res.send("API Running")
})

app.use("/api", productRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})