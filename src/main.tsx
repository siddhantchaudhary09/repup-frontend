import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Home from "./pages/Home.tsx";
import Profile from "./pages/Profile.tsx";
import SignIn from "./pages/SignIn.tsx";

import Register from "./pages/Register.tsx";
import Workout from "./pages/Workout.tsx";

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
        element: <Workout />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
