import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./root.layout";
import Layout from "@/components/layout/layout";
import NotFound from "./error/not-found";
import ErrorPage from "./error/error-page";

const rootRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route path="/" element={<Layout />}>
          {/* Landing page */}
          <Route
            index
            lazy={async () => {
              const { default: Home } = await import("@/pages/main/home");
              return { Component: Home };
            }}
          />
          {/* About page */}
          <Route
            path="about"
            lazy={async () => {
              const { default: About } = await import("@/pages/main/about");
              return { Component: About };
            }}
          />
          {/* Candidates page */}
          <Route
            path="candidates"
            lazy={async () => {
              const { default: Candidates } = await import(
                "@/pages/main/candidates"
              );
              return { Component: Candidates };
            }}
          />
          {/* Positions page */}
          <Route
            path="positions"
            lazy={async () => {
              const { default: Positions } = await import(
                "@/pages/main/positions"
              );
              return { Component: Positions };
            }}
          />
          {/* Results page */}
          <Route
            path="results"
            lazy={async () => {
              const { default: Results } = await import("@/pages/main/results");
              return { Component: Results };
            }}
          />
          {/* Login page */}
          <Route
            path="voter/login"
            lazy={async () => {
              const { default: Login } = await import(
                "@/pages/main/auth/login"
              );
              return { Component: Login };
            }}
          />
        </Route>
        {/* 404 Not Found page - must be at the end */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

export default rootRoutes;
