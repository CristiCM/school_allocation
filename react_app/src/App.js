import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/shared/Home';
import NoPage from './pages/shared/NoPage';
import Login from './pages/shared/Login';
import ImportData from './pages/admins/ImportData';
import SpecilizationCreation from './pages/admins/SpecializationCreation';
import StudentCreation from './pages/admins/StudentCreation';
import Scheduler from './pages/admins/Scheduler';
import AllocationOverview from './pages/admins/AllocationOverview';
import SchoolOptions from './pages/students/SchoolOptions';
import GradesAndSchoolPreferences from './pages/students/GradesAndSchoolPreferences';
import UserCredentialsEdit from './pages/shared/UserCredentialsEdit';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route index element={<Home />} />
          <Route path='/home' element={<Home/>} />
          <Route path='/import_data' element={<ImportData />} />
          <Route path='/specialization_creation' element={<SpecilizationCreation />} />
          <Route path='/student_creation' element={<StudentCreation />} />
          <Route path='/scheduler' element={<Scheduler />} />
          <Route path='/allocation_overview' element={<AllocationOverview />} />
          <Route path='/specialization_creation' element={<SpecilizationCreation />} />
          <Route path='/school_options' element={<SchoolOptions />} />
          <Route path='/grades_and_school_preferences' element={<GradesAndSchoolPreferences />} />
          <Route path='/user_credentials_edit' element={<UserCredentialsEdit />} />
          <Route path='/login' element={ <Login />} />
          <Route path='*' element={ <NoPage />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
