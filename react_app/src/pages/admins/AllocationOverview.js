import NavBar from "../../components/shared/NavBar";
import AllocatedStudentsIndexTable from "../../components/admins/Allocation/AllocatedStudentsIdexTable";

function AllocationOverview(){
    return(
        <>
            <NavBar />
            <div className="fullPageContainer">
                <AllocatedStudentsIndexTable />
            </div>
        </>
    )
}

export default AllocationOverview;