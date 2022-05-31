import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    cartItems,
    totalPrice,
    totalQuantities,
    onRemove,
    setShowCart,
    toogleCartItemQuantity,
  } = useStateContext();
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });


    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };


  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          className="cart-heading"
          type="button"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Back to shopping</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping cart is empty</h3>
            <Link href="/">
              <button
                className="btn"
                type="button"
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 ? (
            <div className="">
              <span className="heading-cart">Your Cart</span>
              <span className="cart-num-items">({totalQuantities} items)</span>
            </div>
          ) : (
            <div className="hidden">
              <span className="heading-cart">Your Cart</span>
              <span className="cart-num-items">({totalQuantities} items)</span>
            </div>
          )}
          {cartItems.length >= 1 &&
            cartItems.map((item, index) => (
              <div key={item._id} className="product">
                <img
                  className="cart-product-image"
                  src={urlFor(item?.image[0])}
                  alt=""
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toogleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num-cart">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toogleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3 className='subtotal'>Subtotal:</h3>
              <h3 className='totalprice'>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button className="btn" type="button" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
