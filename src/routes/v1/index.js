import testsRoute from "./tests/route.js";
import testChildRoute from "./testsChild/route.js";
import { RESOURCE } from "../../constants/index.js";

const routes = [
  {
    url: RESOURCE.TESTS,
    route: testsRoute,
  },
  {
    url: RESOURCE.TESTS_CHILD,
    route: testChildRoute,
  },
];

export const V1 = routes.map((route) => ({
  url: `${RESOURCE.V1}${route.url}`,
  route: route.route,
}));
