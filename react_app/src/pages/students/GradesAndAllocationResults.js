import NavBar from "../../components/shared/NavBar";
import AllocationResultTable from "../../components/students/AllocationResultTable";
import GradeInformationCard from "../../components/students/GradeInformationCard";

function GradesAndAllocationResults
(){
    return(
        <>
            <NavBar />
            <div className="fullPageContainer">
                <GradeInformationCard />
                <br/>
                <br/>
                <br/>
                <AllocationResultTable />
            </div>
        </>
    )
}

export default GradesAndAllocationResults;