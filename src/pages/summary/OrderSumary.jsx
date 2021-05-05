import { useOrderDetails } from "../../context/OrderDetails";

const OrderSumary = () => {
  const [orderDetails] = useOrderDetails();
  orderDetails.optionCounts["scoops"].map((el) => console.log(el));
  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops total: {orderDetails.totals["scoops"]}</h2>
    </div>
  );
};

export default OrderSumary;
