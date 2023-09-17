import StudentCreationForm from "../../../components/admins/StudentCreation/StudentCreationForm";
import NavBar from "../../../components/shared/NavBar";

function StudentCreation(){
    return(
        <>
            <NavBar />
            <div className="fullPageContainer">
                <StudentCreationForm />
            </div>
        </>
    )
}

export default StudentCreation;