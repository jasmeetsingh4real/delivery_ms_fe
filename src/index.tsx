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
import { GuestRoute } from "./guards/guestRoute";
import { StaffRoute } from "./guards/staffRoute";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { Logout } from "./screens/Logout";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: (
            <StaffRoute>
              <Deliveries />
            </StaffRoute>
          ),
        },
        {
          path: "login",
          element: (
            <GuestRoute>
              <StaffLogin />,
            </GuestRoute>
          ),
        },
        {
          path: "logout",
          element: <Logout />,
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
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
