import NavMenüItem from "./NavMenüItem";
import data from "../data";

const NavMenü = () => {
  return (
    <div>
      <i className="fa-brands fa-twitter text-blue-400 fa-2xl mb-6"></i>
      {data.map((item, index) => (
        <NavMenüItem key={index} item={item} />
      ))}
      <div className="bg-blue-400 rounded-full p-4 text-center text-white w-52 ">
        Tweet
      </div>
    </div>
  );
};

export default NavMenü;
