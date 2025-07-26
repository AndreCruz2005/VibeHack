import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/search.tsx"),
  route("favorites", "routes/favorites.tsx"),
  route("comparison", "routes/comparison.tsx"),
  route("institution/:id", "routes/institution.$id.tsx"),
] satisfies RouteConfig;
