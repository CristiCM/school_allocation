import NavBar from "../../components/shared/NavBar";
import PreferenceCreationForm from "../../components/students/Preferences/PreferenceCreationForm";
import PreferenceIndexTable from "../../components/students/Preferences/PreferenceIndexTable";

function SchoolOptions(){
    return(
        <>
            <NavBar />
            <PreferenceCreationForm />
            <PreferenceIndexTable />
        </>
    )
}

export default SchoolOptions;