import React, {useState, useEffect} from 'react'
import {ContractContext} from '../context/ContractContext'

function QuestionList() {

    const {Questions, UserServices, UserContract} = React.useContext(ContractContext)
    const [questions, setQuestions] = useState([])

    useEffect(async () => {
        console.log('Getting questions')
        const response = await UserServices.get_questions()
        console.log(response)
    },[UserContract])

    return (<>
        <div>QuestionList</div>
        {Questions.length?Questions.map((question, index) => <p key={question}>{index+1}. {question}</p> ): <p>No questions yet</p> }
        </>
    )
}

export default QuestionList