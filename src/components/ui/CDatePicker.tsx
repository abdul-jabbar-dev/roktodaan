import React from 'react';
import { CustomProvider, Container } from 'rsuite';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

export default function CDatePicker() {

  return (
    <CustomProvider theme="light">
      <Container className="app">

        <DatePicker oneTap className="border-gray-300 bg-red-800" placeholder="Select Date" />

      </Container>
    </CustomProvider>
  );
}