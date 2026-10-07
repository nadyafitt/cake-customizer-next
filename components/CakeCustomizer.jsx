"use client";

import { useState } from "react";

const prices = {
  flavor: {
    Chocolate: 20,
    Vanilla: 18,
    "Red Velvet": 25,
  },

  frosting: {
    Vanilla: 5,
    Chocolate: 7,
    Strawberry: 8,
  },

  size: {
    "6 inch": 0,
    "8 inch": 10,
    "10 inch": 20,
  },

  topping: {
    None: 0,
    Strawberry: 5,
    Oreo: 6,
    Sprinkles: 3,
  },
};

export default function CakeCustomizer() {

  // ========================================
  // CAKE SELECTION STATE
  // ========================================

  const [cake, setCake] = useState({
    flavor: "Chocolate",
    frosting: "Vanilla",
    size: "6 inch",
    topping: "Strawberry",
  });


  // ========================================
  // CUSTOMER INFORMATION STATE
  // ========================================

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");


  // ========================================
  // ORDER RESULT STATE
  // ========================================

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // ========================================
  // UPDATE CAKE SELECTION
  // ========================================

  function updateCake(type, value) {

    setCake((currentCake) => ({
      ...currentCake,
      [type]: value,
    }));

  }


  // ========================================
  // CALCULATE TOTAL PRICE
  // ========================================

  const total =
    prices.flavor[cake.flavor] +
    prices.frosting[cake.frosting] +
    prices.size[cake.size] +
    prices.topping[cake.topping];


  // ========================================
  // PLACE ORDER
  // ========================================

  async function handleOrder() {

    setSuccess("");
    setError("");

    // Basic validation
    if (!customerName || !phone) {
      setError("Please enter your name and phone number.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch("/api/orders", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          customerName,
          phone,

          flavor: cake.flavor,
          frosting: cake.frosting,
          size: cake.size,
          topping: cake.topping,

          message,

          totalPrice: total,

        }),
      });


      const data = await response.json();


      // API returned an error
      if (!response.ok) {

        setError(
          data.error || "Failed to place order."
        );

        setLoading(false);

        return;
      }


      // Order successfully created
      setSuccess(
        `Order #${data.id} placed successfully!`
      );


      // Clear customer fields
      setCustomerName("");
      setPhone("");
      setMessage("");

    } catch (error) {

      console.error(error);

      setError(
        "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);

    }
  }


  // ========================================
  // UI
  // ========================================

  return (

    <main className="customizer">

      <div className="customizer-card">


        {/* =====================================
            LEFT SIDE - CAKE PREVIEW
        ====================================== */}

        <div className="cake-preview">

          <div className="cake-icon">
            🎂
          </div>

          <h2>Your Cake</h2>


          <p>
            <strong>Flavor:</strong>{" "}
            {cake.flavor}
          </p>


          <p>
            <strong>Frosting:</strong>{" "}
            {cake.frosting}
          </p>


          <p>
            <strong>Size:</strong>{" "}
            {cake.size}
          </p>


          <p>
            <strong>Topping:</strong>{" "}
            {cake.topping}
          </p>


          <h2>
            RM {total.toFixed(2)}
          </h2>

        </div>



        {/* =====================================
            RIGHT SIDE - CAKE OPTIONS
        ====================================== */}

        <div className="cake-options">

          <h2>
            Customize Your Cake
          </h2>


          {/* =================================
              FLAVOR
          ================================== */}

          <h3>Flavor</h3>

          <div className="options">

            {Object.keys(prices.flavor).map(
              (flavor) => (

                <button
                  key={flavor}
                  className={
                    cake.flavor === flavor
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    updateCake(
                      "flavor",
                      flavor
                    )
                  }
                >
                  {flavor}
                </button>

              )
            )}

          </div>


          {/* =================================
              FROSTING
          ================================== */}

          <h3>Frosting</h3>

          <div className="options">

            {Object.keys(prices.frosting).map(
              (frosting) => (

                <button
                  key={frosting}
                  className={
                    cake.frosting === frosting
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    updateCake(
                      "frosting",
                      frosting
                    )
                  }
                >
                  {frosting}
                </button>

              )
            )}

          </div>


          {/* =================================
              SIZE
          ================================== */}

          <h3>Size</h3>

          <div className="options">

            {Object.keys(prices.size).map(
              (size) => (

                <button
                  key={size}
                  className={
                    cake.size === size
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    updateCake(
                      "size",
                      size
                    )
                  }
                >
                  {size}
                </button>

              )
            )}

          </div>


          {/* =================================
              TOPPING
          ================================== */}

          <h3>Topping</h3>

          <div className="options">

            {Object.keys(prices.topping).map(
              (topping) => (

                <button
                  key={topping}
                  className={
                    cake.topping === topping
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    updateCake(
                      "topping",
                      topping
                    )
                  }
                >
                  {topping}
                </button>

              )
            )}

          </div>



          {/* =================================
              CUSTOMER DETAILS
          ================================== */}

          <div className="customer-details">

            <h3>
              Customer Details
            </h3>


            {/* NAME */}

            <input
              type="text"
              placeholder="Your name"
              value={customerName}
              onChange={(event) =>
                setCustomerName(
                  event.target.value
                )
              }
            />


            {/* PHONE */}

            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(event) =>
                setPhone(
                  event.target.value
                )
              }
            />


            {/* MESSAGE */}

            <textarea
              placeholder="Message on cake (optional)"
              value={message}
              onChange={(event) =>
                setMessage(
                  event.target.value
                )
              }
            />

          </div>



          {/* =================================
              ERROR MESSAGE
          ================================== */}

          {error && (

            <p className="order-error">
              {error}
            </p>

          )}



          {/* =================================
              SUCCESS MESSAGE
          ================================== */}

          {success && (

            <p className="order-success">
              {success}
            </p>

          )}



          {/* =================================
              PLACE ORDER BUTTON
          ================================== */}

          <button
            className="place-order-button"
            onClick={handleOrder}
            disabled={loading}
          >

            {loading
              ? "Placing Order..."
              : "Place Order"}

          </button>

        </div>

      </div>

    </main>

  );
}