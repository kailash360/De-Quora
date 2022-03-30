import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {ContractContext} from '../context/ContractContext'

function AddQuestion() {

    const {Services} = React.useContext(ContractContext)
    const [questionText, setQuestionText] = React.useState('')

    const addQuestion = async()=>{
        const response = await Services.add_question(questionText)
        console.log(response)
    }

    return (<>
        <div>Add a Question</div>
        <TextField fullWidth label="Write your question here" id="fullWidth" margin="normal"  onChange={(e)=>{setQuestionText(e.target.value)}} value={questionText} />
        <Button variant="outlined" onClick={addQuestion}>Add Question</Button>
        </>
    )
}

export default AddQuestion