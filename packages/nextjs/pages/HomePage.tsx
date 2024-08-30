import FeaturedLand from "../components/FeaturedLand";
import FeaturedSales from "../components/FeaturedSales";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import SearchOnMap from "../components/SearchOnMap";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedSales />
        <SearchOnMap />
        <FeaturedLand />
      </main>
    </div>
  );
};

export default HomePage;
