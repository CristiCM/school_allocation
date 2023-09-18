import StudentEditForm from "../../../components/admins/StudentCreation/StudentEditForm";
import NavBar from "../../../components/shared/NavBar";

function StudentEdit(){
    return(
        <>
          <NavBar />
          <div className="fullPageContainer">
            <StudentEditForm />
          </div>
        </>
    )
}

export default StudentEdit;