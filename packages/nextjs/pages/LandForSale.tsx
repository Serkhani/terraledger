import FilterSection from "../components/FilterSection";
import Footer from "../components/Footer";
import LandGrid from "../components/LandGrid";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";

const LandsForSale = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <FilterSection />
        <LandGrid />
        <Pagination />
      </main>
      <Footer />
    </div>
  );
};

export default LandsForSale;
