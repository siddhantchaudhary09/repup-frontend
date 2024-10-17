import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/Footer.tsx";

function App() {
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
