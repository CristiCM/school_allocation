import SpecializationCreationFrom from "../../../components/admins/SpecializationCreation/SpecializationCreationFrom";
import SpecializationEditForm from "../../../components/admins/SpecializationCreation/SpecializationEditForm";
import NavBar from "../../../components/shared/NavBar";

function SpecializationCreation(){
    return(
        <>
            <NavBar />
            <div className="fullPageContainer">
                <SpecializationCreationFrom />
                <br />

                { localStorage.getItem('lastCreatedSpec') ?
                <SpecializationEditForm /> :
                null
                }
            </div>
        </>
    )
}

export default SpecializationCreation;