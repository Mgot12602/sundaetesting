import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../context/OrderDetails";
import userEvent from "@testing-library/user-event";

test("displays image for each scoop from server", async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
test("no scoops subtotal update for invalid scoop count", async () => {
  render(<Options optionType="scoops" />);
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const scoopsSubtotal = await screen.findByText("Scoops total: $", {
    exact: false,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  screen.debug();
});
test.skip("don't update total if scoops input is invalid", async () => {
  render(<Options optionType="scoops" />);

  // expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");

  // make sure scoops subtotal hasn't updated
  const scoopsSubtotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsSubtotal).toBeInTheDocument();
});
