import { CardColumns } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";

const OrderSumary = () => {
  const [orderDetails] = useOrderDetails();
  console.log("orderdetailsonly", orderDetails);
  console.log("orderdetails", orderDetails["scoops"]);
  console.log("orderdetailsscoops", orderDetails["scoops"].values());
  console.log("orderdetailsscoopskeys", orderDetails["scoops"].keys());

  console.log("Object.keys", Object.keys(orderDetails["scoops"]));

  const List = ({ optionType }) =>
    Array.from(orderDetails[optionType]).map(([key, value], indx) => {
      console.log("key", key);
      console.log("value", value);
      return <li key={indx}>{`${value} ${key}`}</li>;
    });

  // let rows = [];
  // (function generateRows() {
  //   for (let items of orderDetails["scoops"]) {
  //     console.log("items", items);
  //     console.log("items[0]", items[0]);
  //     // rows.push(`${items[1]} ${items[0]}`);
  //     rows.push(`${items[0]}`);
  //   }
  //   console.log("rows", rows);
  //   return rows;
  // })();

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops total: {orderDetails.totals["scoops"]}</h2>
      <ul>
        <List optionType="scoops" />
      </ul>
      <h2>Toppings total: {orderDetails.totals["toppings"]}</h2>
      <ul>
        <List optionType="toppings" />
      </ul>
    </div>
  );
};

export default OrderSumary;
