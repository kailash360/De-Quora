import React from 'react'

function AnswerList({answers}) {
  return (
    <div>
        <strong>Answers</strong>
        {answers && answers.length? answers.map(answer => <p>{answer.answer}</p>) : <p>No answers yet</p>}
    </div>
  )
}

export default AnswerList