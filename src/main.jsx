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
        path: "/Login",
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
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
