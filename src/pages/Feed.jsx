import LeftColumn from "../layouts/LeftColumn";
import MainColumn from "../layouts/MainColumn";
import RightColumn from "../layouts/RightColumn";

const Feed = () => {
  return (
    <div className="flex w-10/12 mx-auto py-4">
      <LeftColumn />
      <MainColumn />
      <RightColumn />
    </div>
  );
};

export default Feed;
