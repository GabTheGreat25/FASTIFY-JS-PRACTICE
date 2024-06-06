import fastifyMultipart from "@fastify/multipart";
import { V1 } from "./v1/index.js";
import { RESOURCE } from "../constants/index.js";

export const routes = [...V1];

export const addRoutes = (app) => {
  routes.forEach((route) => {
    app.register(fastifyMultipart);
    app.register(route.route, { prefix: `${RESOURCE.API}${route.url}` });
  });
};
