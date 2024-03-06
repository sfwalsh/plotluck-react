import * as React from "react";
import * as ReactDOM from "react-dom/client";

import './index.css';

import ReadingList from "./routes/ReadingList";
import ErrorPage from "./error-page";

// React Router

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

import AddItemView from "./routes/AddItemView";
import EditItemView from "./routes/EditItemView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ReadingList />,
    errorElement: <ErrorPage />
  },
  {
    path: "add",
    element: <AddItemView />,
  },
  {
    path: "edit/:id",
    element: <EditItemView />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);