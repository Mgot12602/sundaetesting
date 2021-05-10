import { render, screen } from "../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phase for happy path", async () => {
  render(<App />);

  const scoopsSubtotal = await screen.findByText("Scoops total: $", {
    exact: false,
  });
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  // screen.debug();
  const grandTotal = await screen.findByRole("heading", {
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
  const summaryItems = await screen.findAllByRole("listitem");
  // console.log("summaryItems", summaryItems);
  // console.log("summaryItems[0].textcontent", summaryItems[0].textContent);
  const summaryItemsText = await summaryItems.map((item) => item.textContent);

  // console.log("summaryItems", summaryItemsText);
  expect(summaryItemsText).toEqual(["1 Vanilla", "1 Cherries"]);
  // console.log("summaryItemsText", summaryItemsText);

  const toppingsSubtotal = await screen.findByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  //confirm order  and confirmation page

  const button = await screen.findByRole("button", { name: "Confirm order" });
  const checkbox = await screen.findByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  userEvent.click(checkbox);
  //inside confirmation page
  userEvent.click(button);
  const thankyou = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankyou).toHaveTextContent(/thank you/i);

  //click new order button on confirmation page
  //check that scoops and toppings subtotals have been reset
  //dow we need to await anything to avoid test errors?
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  const NewOrderButton = await screen.findByRole("button", {
    name: "Make New Order",
  });
  userEvent.click(NewOrderButton);
  // const grandTotal2 = await screen.findByRole("heading", {
  //   name: /grand total: \$/i,
  // });
  // expect(grandTotal2).toHaveTextContent("0.00");
  // // screen.debug();
});
