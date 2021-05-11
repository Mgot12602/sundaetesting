import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();
  console.log("orderDetails.scoops.size", orderDetails.scoops);
  const orderDisabled = orderDetails.totals.scoops === "$0.00";
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal} </h2>
      <button
        disabled={orderDisabled}
        onClick={() => {
          setOrderPhase("review");
          console.log(orderDetails.scoops.size);
        }}
      >
        Order Sundae
      </button>
    </div>
  );
}
