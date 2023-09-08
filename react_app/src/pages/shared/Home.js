import { useContext } from "react";
import NavBar from "../../components/shared/NavBar";
import GradeInformationCard from "../../components/students/GradeInformationCard";
import UserContext from "./UserContext";


function  Home(){
    const [user,] = useContext(UserContext);
    return(
        <>
        <NavBar />
        { user.data && user.data.role === 'student' && <GradeInformationCard/> }
        </>
    )
}

export default Home;