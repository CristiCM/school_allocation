import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { GetSchoolTrackSpecData } from "../../services/API/SchoolCreation/GetSchoolTrackSpecData";
import { GetSchoolSpecializationsData } from "../../services/API/SchoolCreation/GetSchoolSpecializationsData";
import { Link } from "react-router-dom";
import { DeleteSchoolSpecialization } from "../../services/API/SchoolCreation/DeleteSchoolSpecialization";

function SpecializationIndexTable() {
  const [order, setOrder] = useState('DESC');
  const [page, setPage] = useState(1);

  const [schools, setSchools] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const [schoolSpecializations, setSchoolSpecializations] = useState([]);

  const fetchGeneralData = async () => {
    const data = await GetSchoolTrackSpecData();
    setSchools(data.schools);
    setTracks(data.tracks);
    setSpecializations(data.specializations);
  };

  const fetchSpecializationData = async() => {
    const data = await GetSchoolSpecializationsData(order, page);
    setSchoolSpecializations(data.data.school_specializations);
  }

    useEffect(() => {
        const fetchData = async () => {
            await fetchGeneralData();
            await fetchSpecializationData();
        };

        fetchData();
    }, []);

    useEffect(() => {
        fetchSpecializationData();
    }, [order, page]);


  const handleOrdering = async (e) => {
    const newOrder = order === 'DESC' ? 'ASC' : 'DESC';
    setOrder(newOrder);

    await fetchSpecializationData();
  }

  const handleDelete = async (school_spec_id) => {
    await DeleteSchoolSpecialization(school_spec_id);
    await fetchSpecializationData();
  }

  return (
    <>
      <div className="tableGeneral">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>School</th>
              <th>Track</th>
              <th>Specialization</th>
              <th>
                <a href="#" onClick={(e) => {e.preventDefault(); handleOrdering();} }> 
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
                <td>{schools.find(school => school.id === schoolSpecialization.school_id).name}</td>
                <td>{tracks.find(track => track.id === schoolSpecialization.track_id).name}</td>
                <td>{specializations.find(specialization => specialization.id === schoolSpecialization.specialization_id).name}</td>
                <td>{schoolSpecialization.spots_available}</td>
                <td>
                    <Link to={`specialization_edit/${schoolSpecialization.id}`}>Edit</Link>
                </td>
                <td>
                    <button onClick={() => handleDelete(schoolSpecialization.id)}>Delete</button>
                </td>
                </tr>
            )) :
            null}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default SpecializationIndexTable;
