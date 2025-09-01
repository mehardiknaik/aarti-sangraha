import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Layout from "./pages/Aarti/Layout";
import { CircularProgress } from "@mui/material";

const HomePage = React.lazy(() => import("./pages/Aarti/HomePage"));
const ViewPage = React.lazy(() => import("./pages/Aarti/ViewPage"));
const SettingPage = React.lazy(() => import("./pages/SettingPage"));
const AddAartiPage = React.lazy(() => import("./pages/Aarti/AddAartiPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<CircularProgress />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: "aarti/:id",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ViewPage />
          </Suspense>
        ),
      },
      {
        path: "/",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "aarti/new",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <AddAartiPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/setting",
    element: (
      <Suspense fallback={<CircularProgress />}>
        <SettingPage />
      </Suspense>
    ),
  },
]);

export default router;
