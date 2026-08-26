import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "sonner";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Layout({ children }) {
  const loc = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [loc.pathname]);
  return (
    <div className="min-h-screen bg-cream-50 text-ink relative">
      <div className="grain-overlay" />
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
      <Toaster theme="dark" position="top-center" />
    </div>
  );
}
