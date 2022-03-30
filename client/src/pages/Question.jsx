import React, {useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {ContractContext} from '../context/ContractContext'
import QuestionBox from '../components/QuestionBox'
import AnswerList from '../components/AnswerList'
import AddAnswer from '../components/AddAnswer'

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
        <div>
            <QuestionBox question={question}></QuestionBox>
            <AddAnswer questionId={params.questionId}></AddAnswer>
            <AnswerList answers={answers}></AnswerList>
        </div>
        : <p>Loading...</p>
    )
}

export default Question