import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <form className="place-order" action="https://api.web3forms.com/submit" method="POST">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
        <input type="hidden" name="access_key" value="727502e3-55bb-4489-a0f3-123dd021127d"/>
          <input type="text" name="text" placeholder="First Name" />
          <input type="text" name="text" placeholder="Last Name" />
        </div>
        <input type="text" name="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" name="text" placeholder="City" />
          <input type="text" name="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" name="number" placeholder="pin Code" />
        </div>
        <input type="text"  name="number" placeholder="Phone" />
        {/* <input type="hidden" name="redirect" value="https://mywebsite.com/thanks.html"></input> */}
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()  + 0}
              </b>
            </div>
          </div>
          <center>
          <button>Place order</button>
          </center>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
