import { RouterProvider } from "react-router-dom";
import rootRoutes from "./pages/routes";

export default function App() {
  return (
    <>
      <RouterProvider router={rootRoutes} />
    </>
  );
}
