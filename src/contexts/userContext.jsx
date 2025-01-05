import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { API } from "../services/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const history = useHistory();

  function onSubmitFn(data) {
    API.post("/users", data)
      .then((response) => {
        toast.success("Giriş başarılı id" + response.data.id);
        const loggedUser = {
          ...response.data,
          token: "asdasdasdasdasdasdasda",
        };
        setUser(loggedUser);
        history.push("/feed");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }
  function logOut() {
    setUser(null);
    history.push("/login");
  }
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        onSubmitFn,
        logOut,
        toggleTheme,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
