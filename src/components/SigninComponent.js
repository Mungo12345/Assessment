import React, {useState} from "react";
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";


function SignIn(){
    const history = useNavigate();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    async function submit(e){
        e.preventDefault();
        if(!email || !password){
            return alert("Please fill in all details");
        }
        try{
            await axios.post("https://backend-ewdk.onrender.com/signIn", {
                email,password
            })
            .then(res =>{
                if(res.data == "exist"){
                    alert("User already exists")
                }
                else if(res.data == "notexist"){
                    history("/home", {state:{id:email}})
                }
            })
            .catch(e=>{
                alert("Wrong details")
                console.log(e);
            })
        }
        catch(e){
            console.log(e);
        }
    }
    return(
        <div>
            <h1>Signup</h1>

            <form action = "POST">
                <input type = "email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Email"/>
                <input  type = "password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password"/>
                <input type = "submit" onClick = {submit}/>

            </form>
            <br />
            <p>OR</p>
            <br />

            <Link to="/">Login Page</Link>
        </div>
    )
}

export default SignIn;