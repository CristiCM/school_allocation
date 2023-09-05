import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {


  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try{
        const response = await axios.get('http://localhost:3000/school_specializations/new');
        setUsers(response.data);
    }
    catch(e){
        console.error('Error fetching data:', e);
    }
  }

  useEffect(() => { fetchData(); }, []);

  return (
    <ul>
      {users.map(user => ( 
      <li> 
        {user.email}, {user.role}, {user.ro_grade !== null ? user.ro_grade : 'N/A'} 
      </li> ))}
    </ul>
  );
};

export default UserList;
