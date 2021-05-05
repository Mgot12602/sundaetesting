import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";

export default function OrderEntry(props) {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal} </h2>
      <button onClick={() => props.setOrderPhase("review")}>
        Order Sundae
      </button>
    </div>
  );
}
