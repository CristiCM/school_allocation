import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from 'react-bootstrap/Pagination';
import { GetStudents } from "../../../services/API/StudentCreation/GetStudents";
import { DeleteStudent } from "../../../services/API/StudentCreation/DeleteStudent";
import { DownloadStudents } from "../../../services/API/StudentCreation/DownloadStudents";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from '@tanstack/react-query';

import { toast } from "react-toastify";
import LoadingComp from "../../shared/LoadingComp";
import CustomPagination from "../../shared/CustomPagination";

function StudentIndexTable() {
  const queryClient = useQueryClient();

  const [sortBy, setSortBy] = useState('users.email');
  const [order, setOrder] = useState('ASC');
  const [page, setPage] = useState(1);

  const {data: studentsData, isLoading: studentsIsLoading} = useQuery({
    queryKey: ['students', sortBy, order, page],
    queryFn: () => GetStudents(sortBy, order, page),
    onError: () => {toast.error("Error fetching students!")},
  });

  const {mutate: deleteStudent, isLoading: deleteStudentIsLoading} = useMutation({
    mutationFn: (student_id) => {
      return DeleteStudent(student_id);
    },
    onSuccess: () => {
      toast.success('Student deleted successfully');
      queryClient.invalidateQueries('students');
    },
    onError: () => {
      toast.error('Error: Deletion failed!')
    },
  });

  const {mutate: downloadStudents, isLoading: downloadIsLoading} = useMutation({
    mutationFn: ({sortBy, order}) => {
      return DownloadStudents(sortBy, order);
    },
    onSuccess: (blob) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'Students.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('File downloaded successfully!');
    },
    onError: () => {
      toast.error("Error downloading the students.");
    }
  });

  const handleEmailOrdering = async () => {
    setOrder(order === 'DESC' ? 'ASC' : 'DESC');
    setSortBy('users.email');
  };

  const handleCreationOrdering = async () => {
    setOrder(order === 'DESC' ? 'ASC' : 'DESC');
    setSortBy('users.created_at');
  };

  const handleDelete = async (student_id) => {
    deleteStudent(student_id);
  };

  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= studentsData.data.total_pages) 
    {
      setPage(newPage);
    }
  };

  const handleDownload = async(sortBy, order) => {
    downloadStudents({sortBy, order});
  };

  const formatDate = dateString => {
    const [date, time] = dateString.split('T');
    const simplifiedTime = time.substring(0, 8);
    return `${date} ${simplifiedTime}`;
  };

  return (
    studentsIsLoading ?
    <LoadingComp message={"Fetching data..."} /> :
    <>
      <div className="tableContainer">
        <table>
          <caption>All Students</caption>
          <thead>
            <tr>
              <th>
                <a href="#" className="tableHeader"
                  onClick={(e) => { e.preventDefault(); handleEmailOrdering(); }}>
                  Email
                </a>
              </th>
              <th>
                <a href="#" className="tableHeader"
                  onClick={(e) => { e.preventDefault(); handleCreationOrdering(); }}>
                  Creation Time
                </a>
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {studentsData.data.students ?
              studentsData.data.students.map(student => (
                <tr key={student.id}>
                  <td data-cell="email">{student.email}</td>
                  <td data-cell="creation time">{formatDate(student.created_at)}</td>
                  <td data-cell="edit student">
                      <Button className="tableButton" variant="secondary" size="sm" as={Link} to={`/student_edit/${student.id}`}>
                        Edit
                      </Button>
                  </td>
                  <td data-cell="delete student">
                    <Button className="tableButton" variant="secondary" size="sm" disabled={deleteStudentIsLoading} onClick={() => handleDelete(student.id)}>
                      {deleteStudentIsLoading ?
                        "Deleting..." :
                        "Delete"}
                    </Button>
                  </td>
                </tr>
              )) :
              null}
          </tbody>
        </table>


      <CustomPagination 
        page={page}
        total_pages={studentsData.data.total_pages}
        handlePageChange={handlePageChange}
      />

      <Button variant="dark" disabled={downloadIsLoading} onClick={() => handleDownload(sortBy, order)}>
        {downloadIsLoading ?
          "Downloading..." :
          "Download Students"}
      </Button>
    </div>
    </>
  );
}

export default StudentIndexTable;
