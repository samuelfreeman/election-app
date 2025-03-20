import ErrorBoundary from "@/components/error/error-boundary";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
}
