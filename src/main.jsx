import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store.js";
import Login from "./pages/Login/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Permissions from "./pages/Permissions/Permissions.jsx";
import ListUser from "./pages/Users/ListUser/ListUser.jsx";
import RequestUser from "./pages/Users/RequestUser/RequestUser.jsx";
import AproveUser from "./pages/Users/AproveUser/AproveUser.jsx";
import CreateUser from "./pages/Users/CreateUser/CreateUser.jsx";
import BasePage from "./pages/Bases/BasePage.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import menuData from "./menu.json";
import { permissionsDict } from "./menuPermissions.js";

const permissions = permissionsDict(menuData)

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
        path: "list-user",
        element: <ListUser />,
        loader: () => permissions['Ususarios']['childrens']['Listar usuarios']

      },
      {
        path: "request-user",
        element: <RequestUser />,
        loader: () => permissions['Ususarios']['childrens']['Solicitar creación']
      },
      {
        path: "aprove-user",
        element: <AproveUser />,
        loader: () => permissions['Ususarios']['childrens']['Aprobar creación']
      },
      {
        path: "create-user",
        element: <CreateUser />,
        loader: () => permissions['Ususarios']['childrens']['Crear usuario']
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
