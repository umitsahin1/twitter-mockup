import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./pages/Login";
import { Flip, ToastContainer } from "react-toastify";
import "./App.css";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./authContext/AuthContext";
import Tweet from "./pages/Tweet";

function App() {
  return (
    <AuthProvider>
      <div>
        <Switch>
          <Route path="/" exact>
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          </Route>
          <Route path="/profile">
            <PrivateRoute>
              <Profil />
            </PrivateRoute>
          </Route>
          <Route path="/tweet/:tweetId">
            <PrivateRoute>
              <Tweet />
            </PrivateRoute>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
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
      </div>
    </AuthProvider>
  );
}

export default App;
