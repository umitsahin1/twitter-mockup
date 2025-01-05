import { useContext } from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../contexts/userContext";

function PrivateRoute(props) {
  const { children, ...rest } = props;
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={() => (user ? children : <Redirect to="/login" />)}
    />
  );
}
export default PrivateRoute;
