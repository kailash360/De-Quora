import React from 'react'
import AddQuestion from '../components/AddQuestion'
import {Typography, Container} from '@mui/material'

function NewQuestion() {
  return (
    <Container>
      <Typography variant="h4" fontWeight="bold">Create a question</Typography>
      <AddQuestion></AddQuestion>
    </Container>
  )
}

export default NewQuestion