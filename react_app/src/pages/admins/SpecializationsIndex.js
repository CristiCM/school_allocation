import NavBar from "../../components/shared/NavBar";
import SpecializationIndexTable from "../../components/admins/SpecializationIndexTable";
function SpecializationsIndex(){
    return(
        <>
            <NavBar />
            <div className="fullPageContainer">
            <SpecializationIndexTable />
            </div>
        </>
    )
}

export default SpecializationsIndex;