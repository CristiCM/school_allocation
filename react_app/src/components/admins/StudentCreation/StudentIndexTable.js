import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from 'react-bootstrap/Pagination';
import { GetStudents } from "../../../services/API/StudentCreation/GetStudents";
import { DeleteStudent } from "../../../services/API/StudentCreation/DeleteStudent";
import { DownloadStudents } from "../../../services/API/StudentCreation/DownloadStudents";

function StudentIndexTable() {
  const [students, setStudents] = useState([]);

  const [sortBy, setSortBy] = useState('users.email');
  const [order, setOrder] = useState('ASC');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStudentData = async() => {
    const data = await GetStudents(sortBy, order, page);

    setStudents(data.data.users);
    setPage(data.data.pagination_meta_data.page);
    setTotalPages(data.data.pagination_meta_data.total_pages);
  };

  const formatDate = dateString => {
    const [date, time] = dateString.split('T');
    const simplifiedTime = time.substring(0, 8);
    return `${date} ${simplifiedTime}`;
  };

  const handleEmailOrdering = async () => {
    const newOrder = order === 'DESC' ? 'ASC' : 'DESC';
    setOrder(newOrder);
    setSortBy('users.email');

    const data = await GetStudents(sortBy, newOrder, page);
    setStudents(data.data.users);
    setPage(data.data.pagination_meta_data.page);
    setTotalPages(data.data.pagination_meta_data.total_pages);
  };

  const handleCreationOrdering = async () => {
    const newOrder = order === 'DESC' ? 'ASC' : 'DESC';
    setOrder(newOrder);
    setSortBy('users.created_at');

    const data = await GetStudents(sortBy, newOrder, page);
    setStudents(data.data.users);
    setPage(data.data.pagination_meta_data.page);
    setTotalPages(data.data.pagination_meta_data.total_pages);
  };

  const handleDelete = async (student_id) => {
    await DeleteStudent(student_id);
    await fetchStudentData();
  };

  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const data = await GetStudents(sortBy, order, newPage);
      setStudents(data.data.users);
      setPage(Number(data.data.pagination_meta_data.page));
      setTotalPages(data.data.pagination_meta_data.total_pages);
    }
  };

  const handleDownload = async(sortBy, order) => {
    await DownloadStudents(sortBy, order);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchStudentData();
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="tableGeneral">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={4}>All Students</th>
            </tr>
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
            {students ?
              students.map(student => (
                <tr key={student.id}>
                  <td>{student.email}</td>
                  <td>{formatDate(student.created_at)}</td>
                  <td>
                    <Button variant="secondary" size="sm" as={Link} to={`/student_edit/${student.id}`}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button variant="secondary" size="sm" onClick={() => handleDelete(student.id)}>Delete</Button>
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

      <Button variant="dark" onClick={() => handleDownload(sortBy, order)}>Download all Students</Button>
    </>
  );
}

export default StudentIndexTable;
