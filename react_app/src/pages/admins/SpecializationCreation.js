import SpecializationCreationFrom from "../../components/admins/SpecializationCreationFrom";
import NavBar from "../../components/shared/NavBar";

function SpecializationCreation(){
    return(
        <>
            <NavBar />
            <div className="fullPageContainer">
                <SpecializationCreationFrom />
            </div>
        </>
    )
}

export default SpecializationCreation;