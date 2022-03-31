import React, {useState, useEffect} from 'react'
import {ContractContext} from '../context/ContractContext'
import {Grid, Container, IconButton, Typography, Box} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ForumIcon from '@mui/icons-material/Forum';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShareIcon from '@mui/icons-material/Share';
import '../static/styles/Questions.scss'
import Utils from '../utils'

function Question({question}){

    return(
        <Container className='question' maxWidth='lg'>
            <Grid container direction = 'coloumn'>
                <Grid item lg={12} className='question-text'>
                    <Typography variant='h5' fontWeight='semi-bold'>{question.question}</Typography>
                </Grid>
                <Grid item lg={12} className='question-author'>
                    <Typography variant='p' fontSize='large'>{question.author_name}</Typography>
                </Grid>
                <Grid item container lg={12} justifyContent='space-between' className='question-information'>
                    <Grid item lg={11} className='left'>
                        <span><ThumbUpIcon/> {question.likes} &nbsp;</span>
                        <span><ForumIcon/> {question.total_answers} &nbsp;</span>
                        <span><CalendarMonthIcon/> {Utils.DateConvertor(question.created_on)}</span>
                    </Grid>
                    <Grid item lg={1} className='right'>
                        <IconButton><ShareIcon/></IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

function QuestionList() {

    const {DeQuora, Services} = React.useContext(ContractContext)
    const [questions, setQuestions] = useState([])
    
    const getQuestions = async() =>{
        if(!Services) return

        const response = await Services.get_all_questions()        
        setQuestions(response.data.questions)
    }

    useEffect(() => {
        getQuestions()
    },[DeQuora])

    console.log("Final questions: " ,questions)
    
    return (<>
        {(questions && questions.length)?
            questions.map((question, index) => <Question question={question} key={index}/> ): 
            <p>No questions yet</p> 
        }
        </>
    )
}

export default QuestionList