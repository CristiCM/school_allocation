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

  const [schools, setSchools] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [schoolSpecializations, setSchoolSpecializations] = useState([]);

  const [order, setOrder] = useState('DESC');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getSchoolTrackSpecializationQuery = useQuery({
    queryKey: ['schoolTrackSpecData'],
    queryFn: GetSchoolTrackSpecData,
    onSuccess: (data) => {
        setSchools(data.data.data.schools);
        setTracks(data.data.data.tracks);
        setSpecializations(data.data.data.specializations);
    },
    onError: () => {
        toast.error('Error fetching school track specialization data')
    }
  });

  const getSchoolSpecializationsQuery = useQuery({
    queryKey: ['schoolSpecializations', page, order],
    queryFn: () => GetSchoolSpecializationsData(order, page),
    onSuccess: (data) => {
      setSchoolSpecializations(data.data.data.school_specializations);
      setPage(data.data.data.pagination_meta_data.page);
      setTotalPages(data.data.data.pagination_meta_data.total_pages);
    },
    onError: () => {
      toast.error("Error fetching the school specializations.");
    }
  })

  const deleteSchoolSpecializationMutation = useMutation({
    mutationFn: (school_specialization_id) => {
      return DeleteSchoolSpecialization(school_specialization_id);
    },
    onSuccess: (data) => {
      toast.success(data.data.status.message);
      queryClient.invalidateQueries(['schoolSpecializations']);
    },
    onError: (error) => {
      toast.error(error.data.status.message);
    }
  })

  const downloadSchoolSpecializationsMutation = useMutation({
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
    const newOrder = order === 'DESC' ? 'ASC' : 'DESC';
    setOrder(newOrder);
  };

  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  };

  const handleDelete = async (school_specialization_id) => {
    deleteSchoolSpecializationMutation.mutate(school_specialization_id);
  };

  const handleDownload = (order) => {
    downloadSchoolSpecializationsMutation.mutate(order);
  };

  return (
    deleteSchoolSpecializationMutation.isLoading ?
    <LoadingComp message={"Deleteing specialization..."} /> :
    downloadSchoolSpecializationsMutation.isLoading ?
    <LoadingComp message={"Downloading specializations..."} /> :
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
