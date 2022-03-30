import React, {useState, useEffect} from 'react'
import {ContractContext} from '../context/ContractContext'

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
        <div>QuestionList</div>
        {(questions && questions.length)?
            questions.map((question, index) => <p key={index}>{index+1}. {question.question} by {question.author}</p> ): 
            <p>No questions yet</p> 
        }
        </>
    )
}

export default QuestionList