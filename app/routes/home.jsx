import Hero from "../components/Hero";
import SignalBand from "../components/SignalBand";
import About from "../components/About";
import Divisions from "../components/Divisions";
import Members from "../components/Members";
import Gallery from "../components/Gallery";
import Achievements from "../components/Achievements";
import Events from "../components/Events";

export default function Home() {
  return (
    <>
      <Hero />
      <SignalBand />
      <About />
      <Divisions />
      <Members />
      <Gallery />
      <Achievements />
      <Events />
    </>
  );
}
