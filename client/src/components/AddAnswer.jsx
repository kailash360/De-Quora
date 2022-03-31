import React, {useContext, useState, useEffect} from 'react'
import {ContractContext} from '../context/ContractContext'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Container} from '@mui/material'

function AddAnswer({questionId}) {

    const {Services} = useContext(ContractContext);
    
    const [answer, setAnswer] = useState('')

    const addAnswer = async()=> {
        const response = await Services.add_answer(questionId,answer)
        console.log(response)
    }

    return (
        <Container maxWidth={false} className='question-answer-input'>
            <TextField 
                fullWidth
                label="Answer the question here"
                margin="normal"
                multiline
                minRows={5}
                value={answer}
                onChange={(e)=>{setAnswer(e.target.value)}}
                fontSize='large'
            />
            <Button variant="contained" onClick={addAnswer}>Answer</Button>
        </Container>
    )
}

export default AddAnswer