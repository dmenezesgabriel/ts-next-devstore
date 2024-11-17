import fastify from "fastify";
import { productRoutes } from "./routes/products";

export const app = fastify();

app.register(productRoutes, { prefix: "products" });
