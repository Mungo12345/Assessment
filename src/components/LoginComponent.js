import React, {useState} from "react";
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";


function Login(){
    const history = useNavigate();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    async function submit(e){
        e.preventDefault();

        try{
            await axios.post("https://backend-ewdk.onrender.com/", {
                email,password
            })
            .then(res =>{
                if(res.data == "exist"){
                    history("/home", {state:{id:email}})
                }
                else if(res.data == "notexist"){
                    alert("This User does not exist, Please double check password or email.")
                }
            })
            .catch(e=>{
                alert("Wrong password")
                console.log(e);
            })
        }
        catch(e){
            console.log(e);
        }
    }
    return(
        <div>
            <h1>Login</h1>

            <form action = "POST">
                <input type = "email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" />
                <input type = "password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" />
                <input type = "submit" onClick = {submit}/>

            </form>
            <br />
            <p>OR</p>
            <br />

            <Link to="/signIn">Signup Page</Link>
        </div>
    )
}

export default Login;