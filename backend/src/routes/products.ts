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

  app.get("/search", async (request: FastifyRequest, reply: FastifyReply) => {
    const querySchema = z.object({
      q: z.string().optional(),
    });

    const { q } = querySchema.parse(request.query);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!q) {
      reply.status(400).send({ message: "Search query is required" });
      return;
    }

    const products = data.products.filter((product) =>
      product.title.toLowerCase().includes(q.toLowerCase()),
    );

    if (products.length === 0) {
      reply.status(404).send({ message: "No products found" });
    } else {
      return products;
    }
  });
}
