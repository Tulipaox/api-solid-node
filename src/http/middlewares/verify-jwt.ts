import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(request: FastifyRequest, replay: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    replay.status(401).send({ message: "Unauthrorized." });
  }
}
