import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";

import { rest } from "msw";

import { server } from "../../../mocks/server";

test("Error response from server for submitting ordder", async () => {
  server.resetHandlers(
    rest.post(`${process.env.REACT_APP_SERVER_URL}/order`, (req, res, ctx) => {
      res(ctx.status(500), ctx.headers({ "Access-Control-Allow-Origin": "*" }));
    })
  );
  render(<OrderConfirmation setOrderPhase={jest.fn()} />);
  screen.debug();
  const alert = await screen.findByRole("alert");
  screen.debug();
  expect(alert).toHaveTextContent("An unexpected error occurred");
});
