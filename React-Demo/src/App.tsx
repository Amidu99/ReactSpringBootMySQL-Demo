import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home';
import Settings from './pages/Settings';
import Users from './pages/Users';
import UserProfile from './pages/UserProfile';
import EmployeeProfile from './pages/EmployeeProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import Employees from "./pages/Employees";

export default function App() {
  return(
      <>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />}></Route>
              <Route path='/users' element={<Users />}></Route>
              <Route path='/user/:userID' element={<UserProfile />}></Route>
              <Route path='/employees' element={<Employees />}></Route>
              <Route path='/employee/:employeeCode' element={<EmployeeProfile />}></Route>
              <Route path='/settings' element={<Settings />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}