import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/shared/Home';
import NoPage from './pages/shared/NoPage';
import Login from './pages/shared/Login';
import ImportData from './pages/admins/ImportData';
import StudentCreation from './pages/admins/StudentCreation';
import Scheduler from './pages/admins/Scheduler';
import AllocationOverview from './pages/admins/AllocationOverview';
import SchoolOptions from './pages/students/SchoolOptions';
import GradesAndSchoolPreferences from './pages/students/GradesAndSchoolPreferences';
import UserCredentialsEdit from './pages/shared/UserCredentialsEdit';
import { useEffect, useState, useRef } from 'react';
import UserJwt from './components/shared/UserJwtContext';
import PrivateRoute from './components/shared/PrivateRoute';
import SpecializationCreation from './pages/admins/SpecializationCreation';
import { refresh_jwt_token } from './services/refreshJwtToken';


function App() {
  const [jwt, setJwt] = useState('');
  const hasRun = useRef(false); //Used as a workaround for <React.StrictMode> (index.js)

  useEffect(() => {
    if (sessionStorage.getItem('email') && sessionStorage.getItem('role') && !hasRun.current) {
        refresh_jwt_token(setJwt);
        hasRun.current = true;
    }
}, []);


  return (
    <div className="App">
      <UserJwt.Provider value={[jwt, setJwt]}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home/>} />
            <Route path='/import_data' element={<PrivateRoute roles={['admin']} route={<ImportData />} />}/>
            <Route path='/specialization_creation' element={<PrivateRoute roles={['admin']} route={<SpecializationCreation />} />}/>
            <Route path='/student_creation' element={<PrivateRoute roles={['admin']} route={<StudentCreation />} />}/>
            <Route path='/scheduler' element={<PrivateRoute roles={['admin']} route={<Scheduler />} />}/>
            <Route path='/allocation_overview' element={<PrivateRoute roles={['admin']} route={<AllocationOverview />} />}/>
            <Route path='/school_options' element={<PrivateRoute roles={['student']} route={<SchoolOptions />} />}/>
            <Route path='/grades_and_school_preferences' element={<PrivateRoute roles={['student']} route={<GradesAndSchoolPreferences />} />}/>
            <Route path='/user_credentials_edit' element={<PrivateRoute roles={['admin', 'student']} route={<UserCredentialsEdit />} />}/>
            <Route path='/login' element={ <Login />} />
            <Route path='*' element={ <NoPage />} />
          </Routes>
        </BrowserRouter>
      </UserJwt.Provider>
    </div>
  );
}

export default App;
