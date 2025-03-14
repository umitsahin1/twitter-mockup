import NavMenüItem from "./NavMenuItem";
import data from "../data";
import { MdOutlineLogout } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";
import { useHistory } from "react-router-dom";

const NavMenu = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("userId");
    sessionStorage.removeItem("userId");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    history.push("/login");
  };

  return (
    <div>
      <i className="fa-brands fa-twitter text-blue-400 fa-2xl mb-6"></i>
      {data.map((item, index) => (
        <NavMenüItem key={index} item={item} />
      ))}
      <div className="bg-blue-400 rounded-full p-4 text-center text-white w-52 mb-30">
        Tweet
      </div>
      <button
        className="flex justify-center items-center gap-2 border-2 w-40 rounded-full ml-6 cursor-pointer"
        onClick={logout}
      >
        <MdOutlineLogout />
        Logout
      </button>
    </div>
  );
};

export default NavMenu;
