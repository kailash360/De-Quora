import React, {useContext, useState, useEffect} from 'react'
import {ContractContext} from '../context/ContractContext'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddAnswer({questionId}) {

    const {Services} = useContext(ContractContext);
    
    const [answer, setAnswer] = useState('')

    const addAnswer = async()=> {
        const response = await Services.add_answer(questionId,answer)
        console.log(response)
    }

    return (
        <div>
            <TextField label="Answer the question here" margin="normal"  onChange={(e)=>{setAnswer(e.target.value)}} value={answer} />
            <br />
            <Button variant="outlined" onClick={addAnswer}>Answer</Button>
        </div>
    )
}

export default AddAnswer