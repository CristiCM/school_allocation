import NavBar from "../../../components/shared/NavBar";
import SpecializationEditForm from "../../../components/admins/SpecializationCreation/SpecializationEditForm";

function SpecializationEdit(){
    return(
        <>
          <NavBar />
          <div className="fullPageContainer"><SpecializationEditForm /></div>
        </>
    )
}

export default SpecializationEdit;