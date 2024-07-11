import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const [couponCode,setCouponCode] = useState("");
  const [discount,setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(50);

  const navigate = useNavigate();
  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  }

  const applyCouponCode = () => {
    if (couponCode === "THIVA30") {
      setDiscount(getTotalCartAmount() * 0.3); 
      setDeliveryFee(0); 
    } else if (couponCode === "THIVFIRST") {
      setDeliveryFee(0);
    } else {
      setDiscount(0);
      setDeliveryFee(50); 
    }
  };
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className="cross">🗑️</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Discount</p>
              <p>₹{discount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p style={{ color: deliveryFee === 0 ? "green" : "red" }}>₹{deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount() - discount -deliveryFee}</b>
            </div>
          </div>
          <center>
            <button onClick={()=>navigate('/order')}>CHECKOUT</button>
          </center>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Apply Coupon</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" value={couponCode} onChange={handleCouponCodeChange}/>
              <button onClick={applyCouponCode}>Submit</button>
            </div>
          </div>
          <marquee behavior="alternate" direction="alternate">
              <p className="marquee">Apply "THIVFIRST" to get Free delivery</p>
              </marquee>
        </div>
      </div>
    </div>
  );
};

export default Cart;
