const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB (update with your MongoDB URI)
mongoose.connect(
  "mongodb+srv://shakthikannan:sYXU6wn0aCs1H0zf@cluster0.itpwjzc.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const orderSchema = new mongoose.Schema({
  orderid: {
    type: String,
    unique: true,
    required: true,
  },
  username: String,
  item: String,
});

const Order = mongoose.model("Order", orderSchema);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const orders = await Order.find({});
  res.render("index", { orders: orders });
});

app.post("/serve/:id", async (req, res) => {
  const orderId = req.params.id;
  console.log(orderId);

  try {
    const order = await Order.findOneAndDelete({ orderid: orderId });

    if (order) {
      res.redirect("/");
    } else {
      res.status(404).send("Order not found.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting order.");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
