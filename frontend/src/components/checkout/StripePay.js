import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import API from "../../util/API";
import { setAlert } from "../../redux/actions/alertActions";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripePay = () => {
  const [nameOnCard, setNameOnCard] = useState();
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const { total } = useSelector((state) => state.cartReducer);

  const description = "Purchase From <BLANK> store.";

  const onNameOnCard = (e) => {
    setNameOnCard(e.target.value);
  };

  const submitToken = async () => {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    try {
      const { token } = await stripe.createToken(cardElement);
      return token;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = await submitToken();
    console.log(token);
  };

  return (
    <form className="stripe-pay" onSubmit={handleSubmit}>
      <div className="stripe-pay__title">Checkout</div>
      <div className="stripe-pay__grid">
        <div className="stripe-pay__row">
          <input
            name="nameOnCard"
            type="text"
            className="stripe-pay__row-input"
            value={nameOnCard}
            onChange={(e) => onNameOnCard(e)}
            placeholder="name"
            required={true}
          />
        </div>
        <div className="stripe-pay__row">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  "::placeholder": {
                    color: "#aab7c4",
                    fontFamily: "san-sarif",
                  },
                },
                invalid: {
                  color: "#e9327c",
                },
              },
            }}
          />
        </div>
      </div>
      <div className="stripe-pay__row stripe-pay__row-radio">
        <div className="radio radio--fill">use saved card</div>
        <div className="radio">save card</div>
      </div>
      <div className="stripe-pay__row">
        <button className="stripe-pay__button">Pay</button>
      </div>
    </form>
  );
};
export default StripePay;
