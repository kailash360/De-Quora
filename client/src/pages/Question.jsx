import React, {useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Container} from '@mui/material'
import {ContractContext} from '../context/ContractContext'
import QuestionBox from '../components/QuestionBox'
import AnswerList from '../components/AnswerList'
import AddAnswer from '../components/AddAnswer'
import '../static/styles/QuestionPage.scss'

function Question() {

    const params = useParams()
    const {DeQuora,Services} = useContext(ContractContext)
    
    const [question,setQuestion] = useState(null)
    const [answers, setAnswers] = useState([])

    const getQuestion = async()=>{
        const questionResponse = await Services.get_question(params.questionId)
        console.log(questionResponse)
        setQuestion(questionResponse.data.question)
        setAnswers(questionResponse.data.answers)
    }

    useEffect(() => {
        console.log(params)
        getQuestion()
    },[DeQuora])

    return (question?
        <Container maxWidth='lg'>
            <QuestionBox question={question}></QuestionBox>
            <AddAnswer questionId={params.questionId}></AddAnswer>
            <AnswerList answers={answers}></AnswerList>
        </Container>
        : <p>Loading...</p>
    )
}

export default Question