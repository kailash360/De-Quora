import React from 'react'
import {Typography, Container, Avatar,Link} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShareIcon from '@mui/icons-material/Share';
import Utils from '../utils'

function QuestionBox({question}) {
  return (
    <Container maxWidth={false} className='question-box'>
      <Typography variant='h4' fontWeight='bold'>{question.question}</Typography>
      <Container maxWidth={false} className='info'>
        <span> <ThumbUpIcon/> {question.likes}</span>
        <span> <CalendarMonthIcon/> {Utils.DateConvertor(question.created_on)}</span>
        <span> 
          <Avatar 
            src={`https://robohash.org/${question.author_address}`}
            sx={{ width: 24, height: 24 }}
            className='avatar'
          ></Avatar>
          <Link href={`/profile/${question.author_address}`} underline='none'>
            <Typography variant='p' fontSize='large' className='name'>{question.author_name}</Typography>
          </Link>
        </span>
        <span><ShareIcon/></span>
      </Container>
    </Container>
  )
}

export default QuestionBox