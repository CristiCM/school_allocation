import NavBar from "../../components/shared/NavBar";
import SpecializationEditForm from "../../components/admins/SpecializationEditForm";

function SpecializationEdit(){
    return(
        <>
            <NavBar />
            <h2>Specialization Edit Page</h2>
            <SpecializationEditForm />
        </>
    )
}

export default SpecializationEdit;