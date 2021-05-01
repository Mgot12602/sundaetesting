import SummaryForm from "../SummaryForm";
import { render, screen, fireEvent } from "@testing-library/react";

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
    fireEvent.click(checkbox);
    expect(button).toBeEnabled();
  });
  test("unchecking checkbox disables button", () => {
    render(<SummaryForm />);
    const button = screen.getByRole("button", { name: "Confirm order" });
    const checkbox = screen.getByRole("checkbox", {
      name: /Terms and Conditions/i,
    });
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});
