import { useContext } from "react";
import UserContext from "./UserJwtContext";
import Login from "../../pages/shared/Login";
import NotAuthorized from "../../pages/shared/NotAuthorized";

function PrivateRoute({roles, route}) {
    const role = sessionStorage.getItem('role');

    if (!role) {
        return <Login />;
    }

    if (roles && roles.indexOf(role) === -1) {
        return <NotAuthorized />;
    }

    return route;
}

export default PrivateRoute;


