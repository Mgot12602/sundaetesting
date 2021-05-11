import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useOrderDetails } from "../../context/OrderDetails";
import AlertBanner from "../common/AlertBanner";

const OrderConfirmation = ({ setOrderPhase }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  const [optionCounts, setOptionCounts, resetOptionCounts] = useOrderDetails();
  console.log("optionCounts", optionCounts);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/order`)
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => setError(true));
  }, []);
  if (error) {
    return <AlertBanner />;
  }

  function resetOrder() {
    console.log("getting here?");
    resetOptionCounts();
    // setOptionCounts({
    //   scoops: new Map(),
    //   toppings: new Map(),
    // });
    // console.log("optionCounts after reset", optionCounts);
    setOrderPhase("inProgress");
  }

  if (orderNumber) {
    return (
      <div>
        <h1>Thank you</h1>
        <h2>Your order number is{orderNumber}</h2>

        <button onClick={resetOrder}>Make New Order</button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default OrderConfirmation;
