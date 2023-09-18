import StudentIndexTable from "../../../components/admins/StudentCreation/StudentIndexTable";
import NavBar from "../../../components/shared/NavBar";

function StudentIndex(){
    return(
        <>
            <NavBar />
            <div className="fullPageContainer">
                <StudentIndexTable />
            </div>
        </>
    )
}

export default StudentIndex;