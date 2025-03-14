import LeftColumn from "../layouts/LeftColumn";
import RightColumn from "../layouts/RightColumn";
import UserColumn from "../layouts/UserColumn";

const Profil = () => {
  return (
    <div className="flex mx-auto py-4 w-8/12">
      <LeftColumn />
      <UserColumn />
      <RightColumn />
    </div>
  );
};

export default Profil;
