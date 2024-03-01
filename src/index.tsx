import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css';
import ReadingList from "./routes/ReadingList";
import ErrorPage from "./error-page";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ReadingList />,
    errorElement: <ErrorPage />
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