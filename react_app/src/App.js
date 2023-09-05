import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';
import Login from './pages/Login';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route index element={<Home />} />
          <Route path='/home' element={<Home/>} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={ <Login />} />
          <Route path='*' element={ <NoPage />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
