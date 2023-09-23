import NavBar from "../../components/shared/NavBar";
import PreferenceCreationForm from "../../components/students/Preferences/PreferenceCreationForm";
import PreferenceIndexTable from "../../components/students/Preferences/PreferenceIndexTable";

function SchoolOptions(){
    return(
        <>
            <NavBar />
            <div className="fullPageContainer">
                <PreferenceCreationForm />
                <br/>
                <PreferenceIndexTable />
            </div>
        </>
    )
}

export default SchoolOptions;