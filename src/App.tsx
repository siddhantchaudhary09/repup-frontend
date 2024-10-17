import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";

function App() {
  return (
    <div className="px-4 ">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
