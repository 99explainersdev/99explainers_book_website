// import BookDummy from "../components/HomePage/BookDummy";
import HomeHero from "../components/HomePage/HomeHero";
import LatestAdditions from "../components/HomePage/LatestAdditions";
import ExploreByAge from "../components/HomePage/ExploreByAge";
import ExploreBYCategory from "../components/HomePage/ExploreByCategory";
import BookBundles from "../components/HomePage/BookBundles";
import WhyAreWeSpecial from "../components/HomePage/WhyWeAreSpecial";

export default function Home() {
  return (
    <>
      <HomeHero />
      <LatestAdditions />
      <ExploreByAge />
      <ExploreBYCategory />
      <BookBundles /> 
      <WhyAreWeSpecial />
      {/* <BookDummy /> */}
    </>
  );
}
