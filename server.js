import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load environment variables

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // ✅ Use key from .env

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Taha Product" },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:5173/userManagement",
    cancel_url: "http://localhost:5173/cancel",
  });

  res.json({ url: session.url });
});

app.listen(4242, () => console.log("✅ Server running on port 4242"));
