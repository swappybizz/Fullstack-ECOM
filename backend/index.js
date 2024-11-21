const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection string (Docker)
const mongoURL = process.env.MONGO_URL || "mongodb://mongo:27017/ecommerce";

// Connect to MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error:", error));

// Define Schemas and Models
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});
const Product = mongoose.model("Product", ProductSchema);

const OrderSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  user: String,
});
const Order = mongoose.model("Order", OrderSchema);

// Routes
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.get("/seed", async (req, res) => {
  try {
    await Product.insertMany([
      { name: "Product A", price: 100, description: "Description of Product A" },
      { name: "Product B", price: 150, description: "Description of Product B" },
      { name: "Product C", price: 200, description: "Description of Product C" },
    ]);
    res.json({ message: "Products seeded!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to seed products" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
