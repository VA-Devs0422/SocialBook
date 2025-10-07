import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import RouteProtector from "./Components/RouteProtector.jsx";
import PostForm from "./Components/PostForm.jsx";
import DataStore from "./store/DataStore.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: (
          <RouteProtector isAuthPage>
            <Signup />
          </RouteProtector>
        ),
      },
      {
        path: "/login", // Changed from "/Login" for consistency
        element: (
          <RouteProtector isAuthPage>
            <Login />
          </RouteProtector>
        ),
      },
      {
        path: "/post",
        element: <PostForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* <Provider store={DataStore}> */}
      <RouterProvider router={router} />
    </Provider>
    {/* </Provider> */}
  </StrictMode>
);
