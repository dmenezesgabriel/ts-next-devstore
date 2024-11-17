import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import data from "../../data/data.json";
import { z } from "zod";

export async function productRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const { products } = data;
    return products;
  });

  app.get("/featured", async () => {
    const featuredProducts = data.products.filter(
      (product) => product.featured,
    );
    return featuredProducts;
  });

  app.get("/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z.object({ id: z.string() });
    const { id } = paramsSchema.parse(request.params);

    const product = data.products.find(
      (product) => product.id.toString() === id,
    );
    if (!product) {
      reply.status(400).send({ message: "Product not found" });
    } else {
      return product;
    }
  });
}
