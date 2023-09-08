import { useContext } from "react";
import UserContext from "../../pages/shared/UserContext";
import Login from "../../pages/shared/Login";
import NotAuthorized from "../../pages/shared/NotAuthorized";

function PrivateRoute({roles, route}) {
    const [user,] = useContext(UserContext);

    if (!user.data) {
        return <Login />;
    }

    if (roles && roles.indexOf(user.data.role) === -1) {
        return <NotAuthorized />;
    }

    return route;
}

export default PrivateRoute;


