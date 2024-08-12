import React from 'react'
import Header from './HeaderComponent'

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
        //TODO CR basically finish just need UD and done with main
        //add total nums to owners and have it update constantly
        //Make edit component then delete component
        //Should be finished by monday
    )
}
export default Main;