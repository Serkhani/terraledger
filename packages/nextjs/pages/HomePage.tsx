import FeaturedLand from "../components/FeaturedLand";
import FeaturedSales from "../components/FeaturedSales";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import SearchOnMap from "../components/SearchOnMap";

// import Footer from '../components/Footer';

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
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
