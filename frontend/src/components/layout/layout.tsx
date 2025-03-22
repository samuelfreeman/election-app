import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
