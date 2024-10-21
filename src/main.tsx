import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Home from "./pages/Home.tsx";
import Profile from "./pages/Profile.tsx";
import SignIn from "./pages/SignIn.tsx";

import { Provider } from "react-redux";
import Protected from "./components/Protected.tsx";
import Register from "./pages/Register.tsx";
import Workout from "./pages/Workout.tsx";
import store from "./store/store.ts";

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
        path: "/workout",
        element: (
          <Protected authentication={true}>
            <Workout />
          </Protected>
        ),
      },
      {
        path: "/profile",
        element: (
          <Protected authentication={true}>
            <Profile />
          </Protected>
        ),
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <SignIn />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Register />
          </Protected>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
