import React from 'react'

function QuestionBox({question}) {
  return (
    <div>
        <p><strong>Question: {question.question}</strong></p>
        <p>Total answers: {question.total_answers}</p>
    </div>
  )
}

export default QuestionBox