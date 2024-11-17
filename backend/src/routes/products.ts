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

  app.get("/:slug", async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z.object({ slug: z.string() });
    const { slug } = paramsSchema.parse(request.params);

    const product = data.products.find((product) => product.slug === slug);
    if (!product) {
      reply.status(400).send({ message: "Product not found" });
    } else {
      return product;
    }
  });
}
