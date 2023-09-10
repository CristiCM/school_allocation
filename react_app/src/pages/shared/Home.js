import { useContext } from "react";
import NavBar from "../../components/shared/NavBar";
import UserJwt from "../../components/shared/UserJwtContext";
import AdminHomeAccordion from "../../components/admins/AdminHomeAccordion";
import StudentHomeAccordion from "../../components/students/StudentHomeAccordion";


function  Home(){
    const [jwt, setJwt] = useContext(UserJwt);
    const role = sessionStorage.getItem('role');
    return(
        <>
        <NavBar />
        { role && role === 'admin' ?
            <AdminHomeAccordion /> 
            :
            role && role === 'student' ?
            <StudentHomeAccordion />
            :
            null
        }
        </>
    )
}

export default Home;