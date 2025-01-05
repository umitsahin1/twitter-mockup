import { Link, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import { Flip, ToastContainer } from "react-toastify";
import { MdDarkMode } from "react-icons/md";
import { AiOutlineSun } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/userContext";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const { toggleTheme, darkMode } = useContext(UserContext);

  return (
    <div className="bg-white dark:bg-slate-800 ">
      <header className="fixed left-0 right-0 top-0">
        <nav className="flex justify-center items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/feed">Feed</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <Switch>
        <Route path="/" exact>
          <h1>ümit</h1>
        </Route>
        <PrivateRoute exact path="/feed">
          <Feed />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
      <div className="flex justify-end">
        {darkMode ? (
          <AiOutlineSun className="w-10 h-10 m-4 " onClick={toggleTheme} />
        ) : (
          <MdDarkMode className="w-10 h-10 m-4 " onClick={toggleTheme} />
        )}
      </div>
    </div>
  );
}

export default App;
