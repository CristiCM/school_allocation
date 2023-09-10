import NavBar from "../../components/shared/NavBar";
import AdminHomeAccordion from "../../components/admins/AdminHomeAccordion";
import StudentHomeAccordion from "../../components/students/StudentHomeAccordion";


function  Home(){
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