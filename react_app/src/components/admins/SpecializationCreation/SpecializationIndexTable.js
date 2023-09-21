import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from 'react-bootstrap/Pagination';
import { useQuery, useMutation } from "@tanstack/react-query";
import { GetSchoolTrackSpecData } from "../../../services/API/SchoolCreation/GetSchoolTrackSpecData";
import { GetSchoolSpecializationsData } from "../../../services/API/SchoolCreation/GetSchoolSpecializationsData";
import { DeleteSchoolSpecialization } from "../../../services/API/SchoolCreation/DeleteSchoolSpecialization";
import { DownloadSchoolSpecializations } from "../../../services/API/SchoolCreation/DownloadSchoolSpecializations";
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import LoadingComp from "../../shared/LoadingComp";

function SpecializationIndexTable() {
  const queryClient = useQueryClient();
  const [order, setOrder] = useState('DESC');
  const [page, setPage] = useState(1);

  const {data: schoolTrackSpecData, isLoading: schoolTrackSpecIsLoading} = useQuery({
    queryKey: ['schoolTrackSpecData'],
    queryFn: GetSchoolTrackSpecData,
    onError: () => {
        toast.error('Error fetching school track specialization data')
    }
  });

  const {data: schoolSpecializationsData, isLoading: schoolSpecializationsIsLoading} = useQuery({
    queryKey: ['schoolSpecializations', page, order],
    queryFn: () => GetSchoolSpecializationsData(order, page),
    onError: () => {
      toast.error("Error fetching the school specializations.");
    }
  })

  const {mutate: deleteSpecialization, isLoading: deleteSpecializationIsLoading} = useMutation({
    mutationFn: (school_specialization_id) => {
      return DeleteSchoolSpecialization(school_specialization_id);
    },
    onSuccess: () => {
      toast.success('Record deleted successfully')
      queryClient.invalidateQueries(['schoolSpecializations']);
    },
    onError: (error) => {
      error.response.status === 404?
      toast.error('Invalid record id!') :
      error.response.status === 403?
      toast.error("Delete failed: Students have that specialization selected.") :
      toast.error('Error: Delete failed.');
    }
  })

  const {mutate: downloadSpecializations, isLoading: downloadIsLoading} = useMutation({
    mutationFn: (order) => {
      return DownloadSchoolSpecializations(order);
    },
    onSuccess: (blob) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'School Specializations.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('File downloaded successfully!');
    },
    onError: () => {
      toast.error("Error downloading the specializations.");
    }
  });


  const handleOrdering = async () => {
    setOrder(order === 'DESC' ? 'ASC' : 'DESC');
  };

  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= schoolSpecializationsData.data.total_pages) {
      setPage(newPage)
    }
  };

  const handleDelete = async (school_specialization_id) => {
    deleteSpecialization(school_specialization_id);
  };

  const handleDownload = (order) => {
    downloadSpecializations(order);
  };

  return (
    schoolSpecializationsIsLoading || schoolTrackSpecIsLoading ?
    <LoadingComp message={"Fetching data..."} /> :
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
            {console.log()}
            {schoolSpecializationsData.data.school_specializations ?
              schoolSpecializationsData.data.school_specializations.map(schoolSpecialization => (
                <tr key={schoolSpecialization.id}>
                  <td>{(schoolTrackSpecData.data.schools.find(school => school.id === schoolSpecialization.school_id) || {}).name}</td>
                  <td>{(schoolTrackSpecData.data.tracks.find(track => track.id === schoolSpecialization.track_id) || {}).name}</td>
                  <td>{(schoolTrackSpecData.data.specializations.find(specialization => specialization.id === schoolSpecialization.specialization_id) || {}).name}</td>
                  <td>{schoolSpecialization.spots_available}</td>
                  <td>
                    <Button variant="secondary" size="sm" as={Link} to={`/specialization_edit/${schoolSpecialization.id}`}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button variant="secondary" size="sm" disabled={deleteSpecializationIsLoading} onClick={() => handleDelete(schoolSpecialization.id)}>
                      {deleteSpecializationIsLoading ?
                        "Deleting..." :
                        "Delete"}
                    </Button>
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
          {[...Array(schoolSpecializationsData.data.total_pages)].map((_, index) => (
            <Pagination.Item key={index} active={index + 1 === page} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(page + 1)} />
          <Pagination.Last onClick={() => handlePageChange(schoolSpecializationsData.data.total_pages)} />
        </Pagination>
      </div>

      <Button variant="dark" disabled={downloadIsLoading} onClick={() => handleDownload(order)}>
        {downloadIsLoading ?
          "Downloading..." :
          "Download all specializations"}
      </Button>
    </>
  );
}

export default SpecializationIndexTable;
