import React from 'react';
import Paper from '@mui/material/Paper';
import ErrorIcon from '@mui/icons-material/Error';
function ErrorCard(props) {
    const  { message, heading, subHeading } = props;
    console.log('CARD',props);
    return (
        <Paper elevation={3} className='w-100 p-4 d-flex flex-column align-items-center justify-content-center' style={{ color: "#f05a5a" }}>
           
            <ErrorIcon style={{fontSize: '64px'}}/>
            
            <h1>{heading}</h1>
            <h2>{subHeading}</h2>
            <h3>{message}</h3>
        </Paper>
    );
}

export default ErrorCard;