import Fastify from "fastify";
import type { FastifyInstance } from "fastify";
import routes from "./routes/";
import { env } from "node:process";


const app: FastifyInstance = Fastify({
    logger: {
        level: env.NODE_ENV === "development" ? "info" : "error",
    }
});

app.register(routes, { prefix: "/api" });


export default app;