import { render, screen } from "../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phase for happy path", async () => {
  render(<App />);

  const scoopsSubtotal = await screen.getByText("Scoops total: $", {
    exact: false,
  });
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  screen.debug();
  const grandTotal = screen.getByRole("heading", {
    name: /grand total: \$/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");
  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.clear(cherriesInput);
  userEvent.click(cherriesInput);
  expect(grandTotal).toHaveTextContent("3.50");

  //render app
  //add icecream scoops and toppings
  const orderButton = screen.getByRole("button", { name: /Order Sundae/i });
  userEvent.click(orderButton);
  //check summary information based on order
  const orderSummary = await screen.findByRole("heading", {
    name: /order summary/i,
  });

  //accept terms and conditions and click button to confirm order
  const vanillaSummary = await screen.findByRole("listitem", {
    name: /vanilla/i,
  });
  expect(vanillaSummary).toHaveTextContent("1");
  const toppingsSubtotal = await screen.findByText("Toppings:", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("1.50");
  const cherriesSummary = await screen.findByRole("listitem", {
    name: /cherries/i,
  });
  expect(cherriesSummary).toHaveTextContent("1");

  //confirm order  and confirmation page
  //click new order button on confirmation page
  //check that scoops and toppings subtotals have been reset
  //dow we need to await anything to avoid test errors?
  //   await screen.debug();
});
