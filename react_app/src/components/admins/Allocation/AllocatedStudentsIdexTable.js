import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from 'react-bootstrap/Pagination';
import { GetAllocatedStudents } from "../../../services/API/Allocation/GetAllocatedStudents";
import { DownloadAllocatedStudents } from "../../../services/API/Allocation/DownloadAllocatedStudents";
import { GetSchoolTrackSpecData } from "../../../services/API/SchoolCreation/GetSchoolTrackSpecData";

function AllocatedStudentsIndexTable() {

  const [assignments, setAssignments] = useState([]);

  const [sortBy, setSortBy] = useState('users.email');
  const [order, setOrder] = useState('ASC');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [schools, setSchools] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const fetchSchoolTrackSpecData = async () => {
    const data = await GetSchoolTrackSpecData();
    setSchools(data.schools);
    setTracks(data.tracks);
    setSpecializations(data.specializations);
  };

  const fetchAllocatedStudentsData = async() => {
    const data = await GetAllocatedStudents(sortBy, order, page);

    if (data){
        setAssignments(data.data.assignments);
        setPage(Number(data.data.pagination_meta_data.page));
        setTotalPages(data.data.pagination_meta_data.total_pages);
    };
  };

  const fetchSchoolTrackOrSpecializationName = (id, type) => {

    if (type === "school") {
        const school = schools.find(s => s.id === id);
        return school ? school.name : '';
    } else if (type === "track") {
        const track = tracks.find(t => t.id === id);
        return track ? track.name : '';
    } else if (type === "specialization") {
        const specialization = specializations.find(s => s.id === id);
        return specialization ? specialization.name : '';
    };
  }


  const handleSortAndOrdering = async (sortAttribute) => {
    const newOrder = order === 'DESC' ? 'ASC' : 'DESC';
    setOrder(newOrder);
    setSortBy(sortAttribute);
    
    const data = await GetAllocatedStudents(sortAttribute, newOrder, page);
    setAssignments(data.data.assignments);
    setPage(data.data.pagination_meta_data.page);
    setTotalPages(data.data.pagination_meta_data.total_pages);
  };

  const handlePageChange = async (newPage) => {
    
    if (newPage >= 1 && newPage <= totalPages) {
      const data = await GetAllocatedStudents(sortBy, order, newPage);

      if (data){
        setAssignments(data.data.assignments);
        setPage(Number(data.data.pagination_meta_data.page));
        setTotalPages(data.data.pagination_meta_data.total_pages);
      };
    }
  };

  const handleDownload = async(sortBy, order) => {
    await DownloadAllocatedStudents(sortBy, order);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSchoolTrackSpecData();
      await fetchAllocatedStudentsData();
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={11}>All Students</th>
            </tr>
            <tr>
              <th>
                <a href="#" className="tableHeader"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.email'); }}>
                  Email
                </a>
              </th>
              <th>
                <a href="#" className="tableHeader"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.admission_average'); }}>
                  Admission Average
                </a>
              </th>
              <th>
                <a href="#" className="tableHeader"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.en_average'); }}>
                  English Average
                </a>
              </th>
              <th>
                <a href="#" className="tableHeader"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.ro_grade'); }}>
                  Romanian Grade
                </a>
              </th>
              <th>
                <a href="#" className="tableHeader"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.mathematics_grade'); }}>
                  Mathematics Grade
                </a>
              </th>
              <th>
                <a href="#" className="tableHeader"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.mother_tongue'); }}>
                  Mother Tongue
                </a>
              </th>
              <th>
                <a href="#" className="tableHeader"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.mother_tongue_grade'); }}>
                  Mother Tongue Grade
                </a>
              </th>
              <th>
                <a href="#" className="tableHeader"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('users.graduation_average'); }}>
                  Graduation Average
                </a>
              </th>
              <th>
                <a href="#" className="tableHeader"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('schools.name'); }}>
                  School
                </a>
              </th>
              <th>
                <a href="#" className="tableHeader"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('tracks.name'); }}>
                  Track
                </a>
              </th>
              <th>
                <a href="#" className="tableHeader"
                  onClick={(e) => { e.preventDefault(); handleSortAndOrdering('specializations.name'); }}>
                  Specialization
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {assignments ?
              assignments.map(assignment => (
                <tr key={assignment.assignment.id}>
                  <td>{assignment.user.email}</td>
                  <td>{assignment.user.admission_average}</td>
                  <td>{assignment.user.en_average}</td>
                  <td>{assignment.user.ro_grade}</td>
                  <td>{assignment.user.mathematics_grade}</td>
                  <td>{assignment.user.mother_tongue}</td>
                  <td>{assignment.user.mother_tongue_grade}</td>
                  <td>{assignment.user.graduation_average}</td>
                  <td>{fetchSchoolTrackOrSpecializationName(assignment.school_specialization.school_id, "school")}</td>
                  <td>{fetchSchoolTrackOrSpecializationName(assignment.school_specialization.track_id, "track")}</td>
                  <td>{fetchSchoolTrackOrSpecializationName(assignment.school_specialization.specialization_id, "specialization")}</td>
                </tr>
              )) :
              null}
          </tbody>
        </Table>
      </div>

      <div className="pagination">
        <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev onClick={() => { handlePageChange(page - 1)}} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item key={index} active={index + 1 === page} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(page + 1)} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </Pagination>
      </div>

      <Button variant="dark" onClick={() => handleDownload(sortBy, order)}>Download all Students</Button>
    </>
  );
}

export default AllocatedStudentsIndexTable;
