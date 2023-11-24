import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/shared/Home';
import NoPage from './pages/shared/NoPage';
import Login from './pages/shared/Login';
import ImportData from './pages/admins/SpecializationCreation/ImportData';
import StudentCreation from './pages/admins/StudentCreation/StudentCreation';
import StudentIndex from './pages/admins/StudentCreation/StudentIndex';
import StudentEdit from './pages/admins/StudentCreation/StudentEdit';
import Scheduler from './pages/admins/Scheduler';
import AllocationOverview from './pages/admins/AllocationOverview';
import SchoolOptions from './pages/students/SchoolOptions';
import GradesAndAllocationResults from './pages/students/GradesAndAllocationResults';
import UserCredentialsEdit from './pages/shared/UserCredentialsEdit';
import PrivateRoute from './components/shared/PrivateRoute';
import SpecializationCreation from './pages/admins/SpecializationCreation/SpecializationCreation';
import SpecializationsIndex from './pages/admins/SpecializationCreation/SpecializationsIndex';
import SpecializationEdit from './pages/admins/SpecializationCreation/SpecializationEdit';

import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home/>} />
            <Route path='/import_data' element={<PrivateRoute roles={['admin']} route={<ImportData />} />}/>
            <Route path='/specialization_creation' element={<PrivateRoute roles={['admin']} route={<SpecializationCreation />} />}/>
            <Route path='/specialization_index' element={<PrivateRoute roles={['admin']} route={<SpecializationsIndex />} />}/>
            <Route path='/specialization_edit/:id' element={<PrivateRoute roles={['admin']} route={<SpecializationEdit />} />}/>
            <Route path='/student_creation' element={<PrivateRoute roles={['admin']} route={<StudentCreation />} />}/>
            <Route path='/student_index' element={<PrivateRoute roles={['admin']} route={<StudentIndex />} />}/>
            <Route path='/student_edit/:id' element={<PrivateRoute roles={['admin']} route={<StudentEdit />} />}/>
            <Route path='/scheduler' element={<PrivateRoute roles={['admin']} route={<Scheduler />} />}/>
            <Route path='/allocation_overview' element={<PrivateRoute roles={['admin']} route={<AllocationOverview />} />}/>
            <Route path='/school_options' element={<PrivateRoute roles={['student']} route={<SchoolOptions />} />}/>
            <Route path='/grades_and_allocation_results' element={<PrivateRoute roles={['student']} route={<GradesAndAllocationResults />} />}/>
            <Route path='/user_credentials_edit' element={<PrivateRoute roles={['admin', 'student']} route={<UserCredentialsEdit />} />}/>
            <Route path='/login' element={ <Login />} />
            <Route path='*' element={ <NoPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
