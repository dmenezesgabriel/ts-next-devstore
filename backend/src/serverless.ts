import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "./app";

export default async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await app.ready();
    app.server.emit("request", request, reply);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
};
