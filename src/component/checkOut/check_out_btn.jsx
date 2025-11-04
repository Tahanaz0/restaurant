import { loadStripe } from "@stripe/stripe-js";
import { IoBagCheckOutline } from "react-icons/io5";
import "./check_out.css";

// Optional: loadStripe future use ke liye rakha hai (agar publishable key chahi ho)
const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(PUBLISHABLE_KEY);

export default function CheckOutBtn() {
  const handleCheckout = async () => {
    try {
      // Directly redirect user to your Stripe Payment Link
      window.location.href = "https://buy.stripe.com/test_eVq3cv1Bt25oca3e6M1B600";
    } catch (err) {
      console.error("Checkout redirect error:", err);
      alert("Something went wrong redirecting to Stripe.");
    }
  };

  return (
    <div onClick={handleCheckout} className="icon-hover" style={{ cursor: "pointer" }}>
      <IoBagCheckOutline size={22} />
    </div>
  );
}
