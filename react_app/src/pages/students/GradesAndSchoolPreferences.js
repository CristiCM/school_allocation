import NavBar from "../../components/shared/NavBar";
import GradeInformationCard from "../../components/students/GradeInformationCard";

function GradesAndSchoolPreferences
(){
    return(
        <>
            <NavBar />
            <div className="fullPageContainer">
                <GradeInformationCard />
            </div>
        </>
    )
}

export default GradesAndSchoolPreferences;