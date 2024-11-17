import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "./app";

export default async (req: FastifyRequest, res: FastifyReply) => {
  try {
    await app.ready();
    app.server.emit("request", req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
