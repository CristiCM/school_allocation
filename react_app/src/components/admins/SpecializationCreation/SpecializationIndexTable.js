import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from 'react-bootstrap/Pagination';
import { GetSchoolTrackSpecData } from "../../../services/API/SchoolCreation/GetSchoolTrackSpecData";
import { GetSchoolSpecializationsData } from "../../../services/API/SchoolCreation/GetSchoolSpecializationsData";
import { DeleteSchoolSpecialization } from "../../../services/API/SchoolCreation/DeleteSchoolSpecialization";
import { DownloadSchoolSpecializations } from "../../../services/API/SchoolCreation/DownloadSchoolSpecializations";

function SpecializationIndexTable() {
  const [schools, setSchools] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [schoolSpecializations, setSchoolSpecializations] = useState([]);

  const [order, setOrder] = useState('DESC');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchGeneralData = async () => {
    const data = await GetSchoolTrackSpecData();
    setSchools(data.schools);
    setTracks(data.tracks);
    setSpecializations(data.specializations);
  };

  const fetchSpecializationData = async() => {
    const data = await GetSchoolSpecializationsData(order, page);
    setSchoolSpecializations(data.data.school_specializations);
    setPage(data.data.pagination_meta_data.page);
    setTotalPages(data.data.pagination_meta_data.total_pages);
  };

  const handleOrdering = async () => {
    const newOrder = order === 'DESC' ? 'ASC' : 'DESC';
    setOrder(newOrder);

    const data = await GetSchoolSpecializationsData(newOrder, page);
    setSchoolSpecializations(data.data.school_specializations);
    setPage(data.data.pagination_meta_data.page);
    setTotalPages(data.data.pagination_meta_data.total_pages);
  };

  const handleDelete = async (school_spec_id) => {
    await DeleteSchoolSpecialization(school_spec_id);
    await fetchSpecializationData();
  };

  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const data = await GetSchoolSpecializationsData(order, newPage);
      setSchoolSpecializations(data.data.school_specializations);
      setPage(Number(data.data.pagination_meta_data.page));
      setTotalPages(data.data.pagination_meta_data.total_pages);
    }
  };

  const handleDownload = async(order) => {
    await DownloadSchoolSpecializations(order);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchGeneralData();
      await fetchSpecializationData();
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={6}>All Specializations</th>
            </tr>
            <tr>
              <th>School</th>
              <th>Track</th>
              <th>Specialization</th>
              <th>
                <a href="#" className="tableHeader"
                  onClick={(e) => { e.preventDefault(); handleOrdering(); }}>
                  Available Spots
                </a>
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {schoolSpecializations ?
              schoolSpecializations.map(schoolSpecialization => (
                <tr key={schoolSpecialization.id}>
                  <td>{(schools.find(school => school.id === schoolSpecialization.school_id) || {}).name}</td>
                  <td>{(tracks.find(track => track.id === schoolSpecialization.track_id) || {}).name}</td>
                  <td>{(specializations.find(specialization => specialization.id === schoolSpecialization.specialization_id) || {}).name}</td>
                  <td>{schoolSpecialization.spots_available}</td>
                  <td>
                    <Button variant="secondary" size="sm" as={Link} to={`/specialization_edit/${schoolSpecialization.id}`}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button variant="secondary" size="sm" onClick={() => handleDelete(schoolSpecialization.id)}>Delete</Button>
                  </td>
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

      <Button variant="dark" onClick={() => handleDownload(order)}>Download all specializations</Button>
    </>
  );
}

export default SpecializationIndexTable;
