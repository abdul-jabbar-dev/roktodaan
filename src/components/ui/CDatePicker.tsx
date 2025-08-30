import React from 'react';
import { Button, CustomProvider, Container } from 'rsuite';
 import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
 

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default  function CDatePicker() {
 
  return (
    <CustomProvider theme="light">
      <Container className="app"> 
    
         <DatePicker oneTap  clasName="border-gray-300 bg-red-800"  placeholder="Select Date" />
   
      </Container>
    </CustomProvider>
  );
}