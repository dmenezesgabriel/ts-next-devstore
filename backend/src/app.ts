import fastify from "fastify";
import { productRoutes } from "./routes/products";

export const app = fastify({ logger: true });

app.get("/", async () => {
  return { message: "Hello, World!" };
});

app.register(
  async (app) => {
    app.register(productRoutes, { prefix: "products" });
  },
  { prefix: "api" },
);
