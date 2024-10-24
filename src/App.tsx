import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { currentuserapi } from "./Api/Authapi.ts";
import "./App.css";
import Footer from "./components/Footer.tsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    currentuserapi(dispatch);
  }, [dispatch]);
  return (
    <div className=" ">
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
