import FitnessDataVisualizer from "./components/FitnessDataVisualizer";
import Stats from "./components/Stats";
import Header from "./components/ui/Header";
import Divider from "./components/ui/Divider";
import Blog from "./components/Blog";
import Footer from "./components/ui/Footer";
import Banner from "./components/ui/Banner";
import Hero from "./components/ui/Hero";
function App() {
  return (
    <>
      <div className="mx-6">
        <Banner />
        <Hero />
        <Header />
        <FitnessDataVisualizer />
        <Divider />
        <Stats />
        <Blog />
        <Footer />
      </div>
    </>
  );
}

export default App;
