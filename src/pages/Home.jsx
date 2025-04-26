import Navbar from '../components/landing/Navbar';
import HeroSection from "../components/landing/HeroSection";
import FeatureSection from "../components/landing/FeatureSection";
import Workflow from "../components/landing/Workflow";
import Footer from "../components/landing/Footer";
import Pricing from "../components/landing/Pricing";
import Testimonials from "../components/landing/Testimonials";



const Home = () => {
    return (
      <>
        {/* <Navbar /> */}
        {/* <div className="max-w-7xl mx-auto pt-20 px-6"> */}
        <div >
          <HeroSection />
          <FeatureSection />
          <Workflow />
        </div>
      </>
    );
  };
  
  export default Home;
  