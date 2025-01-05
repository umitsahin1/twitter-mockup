import { Link, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import { Flip, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
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
        <Route path="/feed">
          <Feed />
        </Route>
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
    </>
  );
}

export default App;
