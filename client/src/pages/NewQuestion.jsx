import React from 'react'
import AddQuestion from '../components/AddQuestion'
import {Typography, Container} from '@mui/material'
import '../static/styles/NewQuestion.scss'

function NewQuestion() {
  return (
    <Container className="newQuestion">
      <Typography variant="h4" fontWeight="bold">Create a question</Typography>
      <AddQuestion></AddQuestion>
    </Container>
  )
}

export default NewQuestion