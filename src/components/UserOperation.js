import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function UserOperation() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Button variant="contained" color="primary" onClick={() => navigate('/create-user')}>
        Create User
      </Button>
      <Button variant="contained" color="secondary" style={{ marginLeft: '20px' }} onClick={() => navigate('/manage-users')}>
        Manage Users
      </Button>
    </div>
  );
}

export default UserOperation;
