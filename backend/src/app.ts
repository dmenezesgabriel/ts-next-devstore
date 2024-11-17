import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { productRoutes } from "./routes/products";

export const app = fastify({ logger: true });

app.get("/", async () => {
  return { message: "Hello, World!" };
});

app.register(productRoutes, { prefix: "products" });

export default async (req: FastifyRequest, res: FastifyReply) => {
  try {
    await app.ready();
    app.server.emit("request", req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
