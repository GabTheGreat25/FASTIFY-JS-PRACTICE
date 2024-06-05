import { fastify } from "fastify";
import { connectDB, ENV } from "./src/config/index.js";
import { addRoutes } from "./src/routes/index.js";

const app = fastify({ logger: true });

function run() {
  addRoutes(app);

  connectDB(ENV.DATABASE_URI);
  app.log.info(`Host Database connected to ${ENV.DATABASE_URI}`);

  app.listen({ port: ENV.PORT });
  app.log.info(`Host Server started on port ${ENV.PORT}`);
}

run();
