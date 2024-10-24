import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { currentuserapi } from "./Api/Authapi.ts";
import "./App.css";
import Footer from "./components/Footer.tsx";
import SkeletonLoader from "./components/Loader.tsx";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    currentuserapi(dispatch);
  }, [dispatch]);
  return (
    <div className=" ">
      <main>{user ? <Outlet /> : <SkeletonLoader />}</main>
      <Footer />
    </div>
  );
}

export default App;
