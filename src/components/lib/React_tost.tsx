import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ReactTost = () => {
    const notify = () => toast("Wow so easy!");
    return ( 
            <ToastContainer /> 
    );
}

export default ReactTost;
