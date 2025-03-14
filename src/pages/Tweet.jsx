import LeftColumn from "../layouts/LeftColumn";
import RightColumn from "../layouts/RightColumn";
import TweetDetails from "../layouts/TweetDetails";

const Tweet = () => {
  return (
    <div className="flex mx-auto py-4 w-8/12">
      <LeftColumn />
      <TweetDetails />
      <RightColumn />
    </div>
  );
};

export default Tweet;
