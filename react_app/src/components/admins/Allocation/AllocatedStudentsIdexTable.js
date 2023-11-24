import React, { useState } from "react";
// import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { GetAllocatedStudents } from "../../../services/API/Allocation/GetAllocatedStudents";
import { DownloadAllocatedStudents } from "../../../services/API/Allocation/DownloadAllocatedStudents";
import { GetSchoolTrackSpecData } from "../../../services/API/SchoolCreation/GetSchoolTrackSpecData";
import LoadingComp from "../../shared/LoadingComp";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import CustomPagination from "../../shared/CustomPagination";

function AllocatedStudentsIndexTable() {
  const queryClient = useQueryClient();

  const [sortBy, setSortBy] = useState('users.email');
  const [order, setOrder] = useState('ASC');
  const [page, setPage] = useState(1);

  const {data: schoolTrackSpecData, isLoading: schoolTrackSpecIsLoading} = useQuery({
    queryKey: ['schoolTrackSpecData'],
    queryFn: GetSchoolTrackSpecData,
    onError: () => {
        toast.error('Error fetching school track specialization data')
    }
  });

  const {data: allocatedStudentsData, isLoading: allocatedStudentsIsLoading} = useQuery({
    queryKey: ['allocatedStudents', sortBy, order, page],
    queryFn: () => GetAllocatedStudents(sortBy, order, page),
    onError: () => {
      toast.error('Error fetching the allocation data!');
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

  const {mutate: downloadAllocated, isLoading: downloadAllocatedIsLoading} = useMutation({
    mutationFn: ({sortBy, order}) =>
    {
      return DownloadAllocatedStudents(sortBy, order);
    },
    onSuccess: (blob) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'Allocations.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('File downloaded successfully!');
    },
    onError: () => { toast.error('There was an error while downloading!')},
  });


  const handleSortAndOrdering = async (sortAttribute) => {
    setOrder(order === 'DESC' ? 'ASC' : 'DESC');
    setSortBy(sortAttribute);
  };

  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= allocatedStudentsData.data.total_pages) {
      setPage(newPage);
    };
  };

  const handleDownload = async(sortBy, order) => {
    downloadAllocated({sortBy, order});
  };

  return (
    schoolTrackSpecIsLoading || allocatedStudentsIsLoading ?
<<<<<<< HEAD
    <LoadingComp message={"Fetching data..."} /> :
    <>
      <div className="tableGeneral">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={11}>All Students</th>
            </tr>
=======
    (<LoadingComp message={"Fetching data..."} />) : (
      
        <>
        <div className="tableContainer">
        <table>
          <caption>All students</caption>
           <thead>
>>>>>>> 0e72c1ee4db10d88cb4b6ca117c9be9e0fac6284
            <tr>
              <th>
                <a href="#"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.email'); }}>
                  Email
                </a>
              </th>
              <th>
                <a href="#"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.admission_average'); }}>
                  Admission Average
                </a>
              </th>
              <th>
                <a href="#"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.en_average'); }}>
                  English Average
                </a>
              </th>
              <th>
                <a href="#"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.ro_grade'); }}>
                  Romanian Grade
                </a>
              </th>
              <th>
                <a href="#"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.mathematics_grade'); }}>
                  Mathematics Grade
                </a>
              </th>
              <th>
                <a href="#"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.mother_tongue'); }}>
                  Mother Tongue
                </a>
              </th>
              <th>
                <a href="#"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.mother_tongue_grade'); }}>
                  Mother Tongue Grade
                </a>
              </th>
              <th>
                <a href="#"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.graduation_average'); }}>
                  Graduation Average
                </a>
              </th>
              <th>
                <a href="#"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('schools.name'); }}>
                  School
                </a>
              </th>
              <th>
                <a href="#"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('tracks.name'); }}>
                  Track
                </a>
              </th>
              <th>
                <a href="#"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('specializations.name'); }}>
                  Specialization
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
          {console.log(allocatedStudentsData)}
            {allocatedStudentsData.data.assignments ?
              allocatedStudentsData.data.assignments.map(assignment => (
                <tr key={assignment.assignment.id}>
                  <td data-cell="email">{assignment.user.email}</td>
                  <td data-cell="admission average">{assignment.user.admission_average}</td>
                  <td data-cell="english average">{assignment.user.en_average}</td>
                  <td data-cell="romanian grade">{assignment.user.ro_grade}</td>
                  <td data-cell="mathematics grade">{assignment.user.mathematics_grade}</td>
                  <td data-cell="mother tongue">{assignment.user.mother_tongue}</td>
                  <td data-cell="mother tongue grade">{assignment.user.mother_tongue_grade}</td>
                  <td data-cell="graduation average">{assignment.user.graduation_average}</td>
                  <td data-cell="school">{fetchSchoolTrackOrSpecializationName(assignment.school_specialization.school_id, "school")}</td>
                  <td data-cell="track">{fetchSchoolTrackOrSpecializationName(assignment.school_specialization.track_id, "track")}</td>
                  <td data-cell="specialization">{fetchSchoolTrackOrSpecializationName(assignment.school_specialization.specialization_id, "specialization")}</td>
                </tr>
              )) :
              null}
        </tbody>
        </table>
      
        <CustomPagination
          page={page}
          total_pages={allocatedStudentsData.data.total_pages}
          handlePageChange={handlePageChange}
        />

        <Button variant="dark" disabled={downloadAllocatedIsLoading} onClick={() => handleDownload(sortBy, order)}>
          {downloadAllocatedIsLoading ?
            "Downloading..." :
            "Download all Students"}
        </Button>
      </div>
    </>
    )
  );
}

export default AllocatedStudentsIndexTable;
