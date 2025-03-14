import LeftColumn from "../layouts/LeftColumn";
import RightColumn from "../layouts/RightColumn";
import MainColumn from "../layouts/MainColumn";

const Home = () => {
  return (
    <div className="flex w-8/12 mx-auto py-4">
      <LeftColumn />
      <MainColumn />
      <RightColumn />
    </div>
  );
};

export default Home;
