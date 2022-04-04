import React from 'react'
import {ReactComponent as LoadingVector} from '../static/assets/Loading.svg'

function Loader() {
  return (
    <div style={{minHeight:'95vh'}}>
        <LoadingVector></LoadingVector>
    </div>
  )
}

export default Loader