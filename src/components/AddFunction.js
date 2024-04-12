import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function AddFunction({ onAddFunction }) {
  const [funcName, setFuncName] = useState('');

  const submitInfo = (e) => {
    e.preventDefault();
    const functionObject = {
      funcName: funcName
    };

    fetch("http://localhost:8080/functions", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(functionObject)
    })
    .then(response => {
      if (response.ok) {
        onAddFunction(); // Call the function passed via props to refresh the list
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(e => console.log(e));
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 0.5 },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" component="h1" textAlign="center" sx={{ width: '100%' }}>
        Add Function Area
      </Typography>
      <Box sx={{ display: 'flex', width: '50%', alignItems: 'center' }}>
        <TextField
          label="Function Area"
          variant="outlined"
          sx={{ flexGrow: 1 }}
          onChange={(e) => setFuncName(e.target.value)}
        />
      </Box>
      <Button onClick={submitInfo} variant="contained">Add Function</Button>
    </Box>
  );
}
