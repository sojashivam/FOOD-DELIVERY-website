import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// config variables
const USE_STRIPE = false; // 👈 Toggle this flag to switch between Stripe and mock
const currency = "inr";
const deliveryCharge = 50;
const frontend_URL = 'https://tomato-frontend-ds0g.onrender.com';

// ✅ placeOrder
export const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100 * 80, // in paise
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: "Delivery Charge" },
        unit_amount: deliveryCharge * 80 * 100,
      },
      quantity: 1,
    });

    if (USE_STRIPE) {
      const session = await stripe.checkout.sessions.create({
        success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
        line_items: line_items,
        mode: "payment",
      });

      res.json({ success: true, session_url: session.url });
    } else {
      const mockSessionUrl = `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`;
      res.json({
        success: true,
        session_url: mockSessionUrl,
        message: "Mocked payment session (Stripe disabled)",
        mock_payment: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

// ✅ Dummy placeholders for the rest — replace with real logic
export const listOrders = (req, res) => {
  res.send("List all orders (to be implemented)");
};

export const updateStatus = (req, res) => {
  res.send("Update order status (to be implemented)");
};

export const userOrders = (req, res) => {
  res.send("User orders (to be implemented)");
};

export const verifyOrder = (req, res) => {
  res.send("Verify order (to be implemented)");
};
