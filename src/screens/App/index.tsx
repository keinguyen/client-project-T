import { Outlet } from "react-router-dom";
import { useHttpRefreshTokenEffect } from "./hooks/useHttpRefreshTokenEffect";

export function App() {
  useHttpRefreshTokenEffect();

  return <Outlet />;
}
