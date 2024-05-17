import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store.js";
import Login from "./pages/Login/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Permissions from "./pages/Permissions/Permissions.jsx";
import SolicitUser from "./pages/Users/SolicitUser/SolicitUser.jsx";
import BasePage from "./pages/Bases/BasePage.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/dashboard",
    element: <BasePage />,
    children: [
      {
        path: "permissions",
        element: <Permissions />,
      },
      {
        path: "solicit-user",
        element: <SolicitUser />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
