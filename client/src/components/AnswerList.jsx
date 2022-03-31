import React from 'react'
import {Container, Grid, Typography, Avatar, Link, Button} from '@mui/material'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Utils from '../utils'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function Answer({answer}){
  return(
    <Container className='answer'>
      <Grid container spacing={2}>
        <Grid item lg={12} className='answer-author'>
          <Avatar 
            src={`https://robohash.org/${answer.author_address}`}
            sx={{ width: 27, height: 27 }}
            className='avatar'
          ></Avatar>
          <Link href={`/profile/${answer.author_address}`} underline='none'>
            <Typography variant='p' fontSize='1.2em' className='name'>{answer.author_name}</Typography>
          </Link>
        </Grid>
        <Grid item lg={12} className='answer-body'>
          {answer.answer}
        </Grid>
        <Grid item container lg={12} className='answer-info'>
          <Grid item lg={2} style={{marginTop:'10px'}}><ArrowCircleUpIcon/> {answer.likes}</Grid>  
          <Grid item lg={9} style={{marginTop:'10px'}}><CalendarMonthIcon/> {Utils.DateConvertor(answer.created_on)}</Grid>
          <Grid item lg={1}>
            <Button variant='contained' startIcon={<CurrencyRupeeIcon/>} fontSize='1.2em'>PAY</Button>
          </Grid>  
        </Grid>
      </Grid>
    </Container>
  )
}


function AnswerList({answers}) {
  return (
    <Container maxWidth={false} className='question-answer-list'>
      <Typography variant='h5' fontWeight='bold'>{answers && answers.length} Answers</Typography>
      <hr />
      {answers && answers.length? answers.map(answer => <Answer answer={answer}/>) : <p>No answers yet</p>}
    </Container>
  )
}

export default AnswerList