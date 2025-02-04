import BookDummy from "../components/HomePage/BookDummy";
import HomeHero from "../components/HomePage/HomeHero";
import LatestAdditions from "../components/HomePage/LatestAdditions";

export default function Home() {
  return (
    <>
      <HomeHero />
      <LatestAdditions />
      <BookDummy />
    </>
  );
}
