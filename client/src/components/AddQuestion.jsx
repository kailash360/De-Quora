import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Container} from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {ContractContext} from '../context/ContractContext'

function AddQuestion() {

    const navigate = useNavigate()
    const {Services} = React.useContext(ContractContext)
    const [questionText, setQuestionText] = React.useState('')

    const addQuestion = async()=>{
        const response = await Services.add_question(questionText)
        console.log(response)
        if(!response.success) alert(response.message)

        navigate('/dashboard',{replace:true})
    }

    return (
    <Container maxWidth={false} padding={0}>
        <TextField 
            fullWidth 
            label="Write your question here" 
            id="fullWidth" 
            margin="normal" 
            multiline 
            minRows={4} 
            onChange={(e)=>{setQuestionText(e.target.value)}} 
            value={questionText} 
            helperText="Try to keep the question straight and to-the-point. Include as many keywords as possible for better reach."
            fontSize="large"
            InputProps={{
                style:{
                    fontSize: '1.2em'
                }
            }}
            InputLabelProps={{
                style:{
                    fontSize: '1.2em'
                }
            }}
        />
        <Button variant="contained" onClick={addQuestion}>Add Question</Button>
    </Container>
    )
}

export default AddQuestion