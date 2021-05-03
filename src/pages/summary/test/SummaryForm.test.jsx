import SummaryForm from "../SummaryForm";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("tests for the checkbox button", () => {
  test("checkbox is unchecked by default", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /Terms and Conditions/i,
    });
    expect(checkbox).not.toBeChecked();
  });
  test("checkbox enables button", () => {
    render(<SummaryForm />);
    const button = screen.getByRole("button", { name: "Confirm order" });
    const checkbox = screen.getByRole("checkbox", {
      name: /Terms and Conditions/i,
    });
    expect(button).toBeDisabled();
    userEvent.click(checkbox);
    expect(button).toBeEnabled();
  });
  test("unchecking checkbox disables button", () => {
    render(<SummaryForm />);
    const button = screen.getByRole("button", { name: "Confirm order" });
    const checkbox = screen.getByRole("checkbox", {
      name: /Terms and Conditions/i,
    });
    userEvent.click(checkbox);
    userEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});

test("popover responds to hover", async () => {
  //popover starts out hidden
  render(<SummaryForm />);
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  //popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disapears when we mouse out
  userEvent.unhover(termsAndConditions);

  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
  //   expect(nullPopoverAgain).not.toBeInTheDocument();
});
