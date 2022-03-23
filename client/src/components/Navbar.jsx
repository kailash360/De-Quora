import React from 'react'
import {AuthContext} from '../context/AuthContext'

function Navbar(){

    const state = React.useContext(AuthContext)
    console.log(state)

    return(
        <p>Hello</p>
    )

}

export default Navbar;