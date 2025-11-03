import { loadStripe } from "@stripe/stripe-js";
import { IoBagCheckOutline } from "react-icons/io5";
import "./check_out.css";

const stripePromise = loadStripe(
  "pk_test_51SPMsxFPpmjSSKW4o1MSHgds1wyM2o8R8xasSaC6XuwehEE4nCqHi0ECRXktrmOGcfaAxpDQ0PTPlzcOe7KXNTJg00dgxWJy38"
);

export default function CheckOutBtn() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      const response = await fetch(
        "http://localhost:4242/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Checkout session response not ok:", response.status, errorText);
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();
      console.log("Checkout session response:", session);

      // New Stripe.js (2025+) requires direct navigation to hosted Checkout URL
      if (session.url) {
        window.location.href = session.url;
        return;
      }

      // If no URL was returned, surface full payload for quick debugging
      alert("Stripe session not created properly!\n" + JSON.stringify(session));
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong starting checkout.");
    }
  };

  return (
    <div onClick={handleCheckout} className="icon-hover" style={{ cursor: "pointer" }}>
      <IoBagCheckOutline size={22} />
    </div>
  );
}
