import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const status = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("checkout"); // "success" | "cancel" | null
  }, [location.search]);

  useEffect(() => {
    if (status) setVisible(true);
  }, [status]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      const params = new URLSearchParams(location.search);
      params.delete("checkout");
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
    }, 300); // smooth close
  };

  if (!status || !visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          width: "min(360px, 90vw)",
          padding: "25px 20px",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.3s ease",
        }}
      >
        <h3 style={{ marginBottom: 10, color: status === "success" ? "#198754" : "#dc3545" }}>
          {status === "success" ? "Payment Successful" : "Payment Canceled"}
        </h3>
        <p style={{ marginBottom: 20, fontSize: 15, color: "#555" }}>
          {status === "success"
            ? "Thank you! Your payment was processed successfully."
            : "You canceled the checkout. You can try again anytime."}
        </p>

        <button
          onClick={handleClose}
          style={{
            padding: "8px 18px",
            background: "#0d6efd",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          OK
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

