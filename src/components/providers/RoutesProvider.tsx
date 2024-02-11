import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";

export function RoutesProvider() {
  return <RouterProvider router={router} />;
}
