import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from './AppBar'; 

const ManagerDashboard = () => {
    const navigate = useNavigate();

    // Define some inline styles
    const buttonStyle = {
        margin: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50', // Green background
        color: 'white',
        border: 'none',
        borderRadius: '5px'
    };

    const dashboardStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px'
    };

    return (
        <div>
            <AppBar title="Manager Dashboard" /> 
            <div style={dashboardStyle}>
            <button style={buttonStyle} onClick={() => navigate('/create-bug')}>Create Bug</button>
            <button style={buttonStyle} onClick={() => navigate('/manage-program')}>Manage Program</button>
            <button style={buttonStyle} onClick={() => navigate('/manage-function')}>Manage Function</button>
            <button style={buttonStyle} onClick={() => navigate('/manage-user')}>Manage User</button>
        </div>
        </div>
    );
};

export default ManagerDashboard;

