import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSumary";
import { OrderDetailsProvider } from "./context/OrderDetails";
import { useOrderDetails } from "./context/OrderDetails";
import { useState } from "react";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry;
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = "OrderConfirmation";
      break;
    default:
  }

  return (
    <Container>
      <OrderDetailsProvider>
        {<Component setOrderPhase={setOrderPhase} />}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
