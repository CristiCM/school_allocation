import Table from "react-bootstrap/Table";
import { GetAllocatedStudent } from "../../services/API/Allocation/GetAllocatedStudent";
import { GetSchoolTrackSpecData } from "../../services/API/SchoolCreation/GetSchoolTrackSpecData";
import { GetAllSchoolSpecializations } from "../../services/API/SchoolCreation/GetAllSchoolSpecializations";
import LoadingComp from "../shared/LoadingComp";
import { useQuery } from "@tanstack/react-query";
import { toast } from 'react-toastify';

function AllocationResultTable() {
  const id = sessionStorage.getItem('id');

  const {data: schoolTrackSpecData, isLoading: schoolTrackSpecIsLoading} = useQuery({
    queryKey: ['schoolTrackSpecData'],
    queryFn: GetSchoolTrackSpecData,
    onError: () => {
        toast.error('Error fetching school track specialization data')
    }
  });

  const {data: allSpecializationsData, isLoading: allSpecializationsDataIsLoading} = useQuery({
    queryKey: ['schoolSpecializationData'],
    queryFn: GetAllSchoolSpecializations,
    onError: () => {
        toast.error('Error fetching the school specialization data!');
    },
  });

  const {data: allocation, isLoading: allocationIsLoading} = useQuery({
    queryKey: ['allocation'],
    queryFn: () => GetAllocatedStudent(id),
    onError: () => {
        toast.error('There was an error fetching the allocation information!');
    },
  });



  const fetchSchoolTrackOrSpecializationName = (id, type) => {
    console.log(schoolTrackSpecData);
    if (type === "school") {
        const school = schoolTrackSpecData.data.schools.find(s => s.id === id);
        return school ? school.name : '';
    } else if (type === "track") {
        const track = schoolTrackSpecData.data.tracks.find(t => t.id === id);
        return track ? track.name : '';
    } else if (type === "specialization") {
        const specialization = schoolTrackSpecData.data.specializations.find(s => s.id === id);
        return specialization ? specialization.name : '';
    };
  }

  return (
    schoolTrackSpecIsLoading || allSpecializationsDataIsLoading || allocationIsLoading ?
    <LoadingComp message={"Fetching data..."} /> :
    <>
      {console.log(allSpecializationsData)}
      {console.log(allSpecializationsData)}
      {console.log(allSpecializationsData)}
      <div className="tableGeneral">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={3}>Your assignment</th>
            </tr>
            <tr>
              <th>School</th>
              <th>Track</th>
              <th>Specialization</th>
            </tr>
          </thead>
          <tbody>
            {allocation.data.assignment ?
                <tr key={allocation.data.assignment.id}>
                  <td>{fetchSchoolTrackOrSpecializationName(allSpecializationsData.data.school_specializations.find(s => s.id === allocation.data.assignment.school_specialization_id).school_id, "school")}</td>
                  <td>{fetchSchoolTrackOrSpecializationName(allSpecializationsData.data.school_specializations.find(s => s.id === allocation.data.assignment.school_specialization_id).track_id, "track")}</td>
                  <td>{fetchSchoolTrackOrSpecializationName(allSpecializationsData.data.school_specializations.find(s => s.id === allocation.data.assignment.school_specialization_id).specialization_id, "specialization")}</td>
                </tr>
               :
              null}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default AllocationResultTable;
