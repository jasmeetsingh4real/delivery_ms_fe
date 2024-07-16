import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import path, { basename } from "path";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Deliveries } from "./screens/Deliveries";
import { StaffLogin } from "./screens/StaffLogin";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Deliveries />,
        },
        {
          path: "login",
          element: <StaffLogin />,
        },
      ],
    },
  ],
  {
    basename: "/",
  }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);
