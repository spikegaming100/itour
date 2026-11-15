import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Sri from "@/pages/Sri";
import Db from "@/pages/Db";
import Sci from "@/pages/Sci";
import Mus from "@/pages/Mus";
import TravelRoutes from "@/pages/TravelRoutes";
import Contact from "@/pages/Contact";

const App = () => {
  return (
    <div className="antialiased w-full flex flex-col min-h-screen justify-between gap-20 max-[768px]:gap-6">
      <div className="overflow-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sri" element={<Sri />} />
          <Route path="/db" element={<Db />} />
          <Route path="/sci" element={<Sci />} />
          <Route path="/mus" element={<Mus />} />
          <Route path="/routes" element={<TravelRoutes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
