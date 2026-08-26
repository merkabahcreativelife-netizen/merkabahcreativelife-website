import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from "@/components/site/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Founder from "@/pages/Founder";
import CreativeAgency from "@/pages/CreativeAgency";
import Studios from "@/pages/Studios";
import Academy from "@/pages/Academy";
import AcademyProgram from "@/pages/AcademyProgram";
import Live from "@/pages/Live";
import Courses from "@/pages/Courses";
import Podcast from "@/pages/Podcast";
import Wellness from "@/pages/Wellness";
import Careers from "@/pages/Careers";
import Internships from "@/pages/Internships";
import Store from "@/pages/Store";
import Journal from "@/pages/Journal";
import Contact from "@/pages/Contact";
import Community from "@/pages/Community";
import SearchPage from "@/pages/Search";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";

const LayoutRoute = () => <Layout><Outlet /></Layout>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/creative-agency" element={<CreativeAgency />} />
          <Route path="/studios" element={<Studios />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/academy/:slug" element={<AcademyProgram />} />
          <Route path="/live" element={<Live />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/internships" element={<Internships />} />
          <Route path="/store" element={<Store />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/community" element={<Community />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
