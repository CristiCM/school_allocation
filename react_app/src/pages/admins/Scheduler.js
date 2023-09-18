import NavBar from "../../components/shared/NavBar";
import JobTableIndex from "../../components/admins/Scheduler/JobTableIndex";
import JobCreationForm from "../../components/admins/Scheduler/JobCreationForm";

function Scheduler(){
    return(
        <>
            <NavBar />
            <br />
            <br />
            <JobTableIndex />
            <div className="fullPageContainer">
                <JobCreationForm />
            </div>
        </>
    )
}

export default Scheduler;