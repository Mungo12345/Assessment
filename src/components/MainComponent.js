import React from 'react'

import Home from './HomeComponent';
import SignIn from './SigninComponent';
import Login from './LoginComponent';
import Add from './AddOwnerComponent';
import AddLand from './AddLandHoldingComponent';
import EditOwner from './EditOwnerComponent';
import {Routes, Route, redirect} from 'react-router-dom'
import EditLandHolding from './EditLandHoldingComponent';
import FileOwner from './FileUploadOwner';
import FileLand from './FileUploadLand';

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
        <Route path = '/FileUploadOwner/:id' element = {<FileOwner/>}/>
        <Route path = '/FileUploadLand/:id' element = {<FileLand/>}/>
        </Routes>
        </React.Fragment>
        //TODO Optional: Bonus part also try to make it pretty
        // so we need to allow user to upload files which is pretty easy
        // then we need to show links to related files not sure what this means
        //Probably make a values array just like the edits and send the req to connect
        // then attach the id of the image to the newly created idimage for owners
        //this should allow us to find the specific image for the database to display
        // a owner can have multiple images so we need to use a loop thing
    )
}
export default Main;