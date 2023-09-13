import NavBar from "../../components/shared/NavBar";
import ImportDataForm from "../../components/admins/ImportDataForm";

function ImportData(){
    return(
        <>
            <NavBar />
            <div className="fullPageContainer"><ImportDataForm /></div>
        </>
    )
}

export default ImportData;