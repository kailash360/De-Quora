import React, {useState, useEffect} from 'react'
import {ContractContext} from '../context/ContractContext'

function QuestionList() {

    const {Questions, UserServices, UserContract, QuestionServices} = React.useContext(ContractContext)
    const [questions, setQuestions] = useState([])

    useEffect(async () => {

        // if(Questions.length && questions.length === Questions.length) return

        console.log('Getting questions')
        const response = await UserServices.get_questions()
        console.log(response)

        const allQuestions = await QuestionServices.get_question_list(response.data.questions)
        console.log(allQuestions.data)
        setQuestions(allQuestions.data.questions)
    },[UserContract, Questions])

    console.log("Final questions: " ,questions)
    
    return (<>
        <div>QuestionList</div>
        {(questions && questions.length)?
            questions.map((question, index) => <p key={index}>{index+1}. {question.question} by {question.author}</p> ): 
            <p>No questions yet</p> 
        }
        </>
    )
}

export default QuestionList