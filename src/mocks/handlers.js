import { rest } from "msw";

export const handlers = [
  rest.get(`${process.env.REACT_APP_SERVER_URL}/scoops`, (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),
  rest.get(`${process.env.REACT_APP_SERVER_URL}/toppings`, (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ])
    );
  }),
  rest.post(`${process.env.REACT_APP_SERVER_URL}/order`, (req, res, ctx) => {
    return res(ctx.json({ orderNumber: 1234567 }));
  }),
];
