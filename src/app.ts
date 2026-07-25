import Fastify from "fastify";
import { validatorCompiler, serializerCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import routes from "./routes/";
import { env } from "node:process";

const app = Fastify({
    logger: {
        level: env.NODE_ENV === "development" ? "info" : "error",
    }
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(routes, { prefix: "/api" });

export default app;