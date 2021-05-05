import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";
import { OrderDetailsProvider } from "../../../context/OrderDetails";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);
  //make sure total starts out at 0.00$
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.clear(cherriesInput);
  expect(cherriesInput).not.toBeChecked();
  userEvent.click(cherriesInput);
  expect(cherriesInput).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("1.50");
  const mAndMsInput = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  userEvent.click(mAndMsInput);
  expect(mAndMsInput).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  userEvent.click(mAndMsInput);
  expect(mAndMsInput).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");
    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.clear(cherriesInput);
    userEvent.click(cherriesInput);
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("updates properly if topping is added first", () => {});
  test("updates properly if item is removed", () => {});
});
