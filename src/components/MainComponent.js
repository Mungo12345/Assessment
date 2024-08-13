import React from 'react'

import Home from './HomeComponent';
import SignIn from './SigninComponent';
import Login from './LoginComponent';
import Add from './AddOwnerComponent';
import AddLand from './AddLandHoldingComponent';
import EditOwner from './EditOwnerComponent';
import {Routes, Route, redirect} from 'react-router-dom'
import EditLandHolding from './EditLandHoldingComponent';

function Main (){
    return(
        <React.Fragment>
        <Routes>
        <Route path = 'home' element = {<Home/>}/>
        <Route path = '/signIn' element = {<SignIn/>}/>
        <Route path = '/' element = {<Login/>}/>
        <Route path = '/Add' element={<Add/>}/>
        <Route path = '/EditOwner/:id' element={<EditOwner/>}/>
        <Route path = '/AddLand' element={<AddLand/>}/>
        <Route path = '/EditLandHolding/:id' element={<EditLandHolding/>}/>
        </Routes>
        </React.Fragment>
        //TODO Optional: Bonus part also try to make it pretty
        // so we need to allow user to upload files which is pretty easy
        // then we need to show links to related files not sure what this means
    )
}
export default Main;