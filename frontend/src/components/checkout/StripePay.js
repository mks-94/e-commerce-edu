import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import API from "../../util/API";
import { setAlert } from "../../redux/actions/alertActions";

import { cardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripePay = () => {
  const [nameOnCard, setNameOnCard] = useState();

  return <div></div>;
};

export default StripePay;
