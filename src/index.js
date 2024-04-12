import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import ManageProgram from './components/ManageProgram';
import ManageFunction from './components/ManageFunction';
import UserOperation from './components/UserOperation';
import CreateBug from './components/CreateBug';
import ManagerDashboard from './components/ManagerDashBoard';
import CreateUser from './components/CreateUser';
import ManageUser from './components/ManageUser';
import EditUser from './components/EditUser';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <ManageProgram/> */}
    {/* <ManageFunction/> */}
    {/* <UpdateUser/> */}
    {/* <UserOperation/> */}
    <BrowserRouter>
          <Routes>
                <Route path="/" element={<ManagerDashboard />} />
                <Route path="/create-bug" element={<CreateBug />} />
                <Route path="/manage-program" element={<ManageProgram />} />
                <Route path="/manage-function" element={<ManageFunction />} />
                <Route path="/manage-user" element={<UserOperation />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/manage-users" element={<ManageUser />} />
                <Route path="/edit-user/:username" element={<EditUser />} />
            </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
