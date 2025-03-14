import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NavMenuItem = ({ item }) => {
  return (
    <div className="flex my-2 text-2xl items-center hover:text-blue-400 dark:text-white">
      <div className="text-center p-2 w-10">
        <i className={item.class}></i>
      </div>
      <Link className="ml-4 mt-0.5" to={item.url}>
        {item.name}
      </Link>
    </div>
  );
};

export default NavMenuItem;
