import * as React from "react";
import * as ReactDOM from "react-dom/client";

import './styling/index.css';

import ReadingList from "./routes/ReadingList";
import ErrorPage from "./components/ErrorPage";

// React Router

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

import AddItemView from "./routes/AddItemView";
import EditItemView from "./routes/EditItemView";
import BookSearchResultsView from "./routes/BookSearchResultsView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ReadingList />,
    errorElement: <ErrorPage />
  },
  {
    path: "add",
    element: <AddItemView />,
    errorElement: <ErrorPage />
  },
  {
    path: "edit/:id",
    element: <EditItemView />,
    errorElement: <ErrorPage />
  },
  {
    path: "results",
    element: <BookSearchResultsView />,
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