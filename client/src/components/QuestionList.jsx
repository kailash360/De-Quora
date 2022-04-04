import React, {useState, useEffect} from 'react'
import {ContractContext} from '../context/ContractContext'
import {Grid, Container, IconButton, Typography, Link, Button} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ForumIcon from '@mui/icons-material/Forum';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShareIcon from '@mui/icons-material/Share';
import '../static/styles/Questions.scss'
import Utils from '../utils'
import Avatar from '@mui/material/Avatar';
import Loader from '../components/Loader'

export const Question = ({question}) =>{

    return(
        <Container className='question' maxWidth='lg'>
            <Grid container direction = 'coloumn'>
                <Grid item lg={12} className='question-text'>
                    <Link href={`/question/${question.id}`} color='black' underline='none'>
                        <Typography variant='h5' fontWeight='semi-bold'>{question.question}</Typography>
                    </Link>
                </Grid>
                <Grid item lg={12} className='question-author' direction='row'>
                    <Avatar 
                        src={`https://robohash.org/${question.author_address}`}
                        sx={{ width: 24, height: 24 }}
                        className='avatar'
                    ></Avatar>
                    <Link href={`/profile/${question.author_address}`} underline='none'>
                        <Typography variant='p' fontSize='large' className='name'>{question.author_name}</Typography>
                    </Link>
                </Grid>
                <Grid item container lg={12} justifyContent='space-between' className='question-information'>
                    <Grid item lg={11} className='left'>
                        <span> <Button startIcon={<ThumbUpIcon/>} variant='text'>{question.likes}</Button>&nbsp;</span>
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
    const [loading, setLoading] = useState(false)
    
    const getQuestions = async() =>{
        if(!Services) return

        const response = await Services.get_all_questions()        
        setQuestions(response.data.questions)
    }

    useEffect(() => {
        setLoading(true)
        getQuestions()
        setLoading(false)
    },[DeQuora])
    
    return (<>
        {!loading?
            questions && questions.length?
            questions.map((question, index) => <Question question={question} key={index}/> )
            : <Container className='no-questions'>
                Looks like there are no questions yet
            </Container>        
        : <Loader></Loader> 
        }
        </>
    )
}

export default QuestionList