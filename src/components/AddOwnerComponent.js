import React, {useState} from "react";
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";
import urlState from "./HomeComponent"


function Add(){
    const history = useNavigate();
    const [ownerName,setownerName] = useState('')
    const [entityType,setEntityType] = useState('')
    const [ownerType,setOwnerType] = useState('')
    const [address,setAddress] = useState('')
    async function submit(e){
        e.preventDefault();
        if(!ownerName || !entityType || !ownerType || !address){
            return alert("Please fill in all details");
        }
        try{
            await axios.post("http://localhost:3000/Add", {
                ownerName,entityType,ownerType,address
            })
            .then(res =>{
                if(res.data == "exist"){
                    alert("Owner already exists, Please change owner name or address")
                }
                else if(res.data == "notexist"){
                    history("/home", {state:{id:sessionStorage.getItem("urlState")}})
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
            <h1>Add Owner Details</h1>

            <form action = "POST">
            <label>Owner Name: </label>
                <input type = "ownerName" onChange={(e) => {setownerName(e.target.value)}} placeholder="ownerName" required={true}/>
                <br></br>
                <label>Entity Type: </label>
                <select onChange={(e)=>{setEntityType(e.target.value)}}>
                    <option disabled selected value> -- select an option -- </option>
                    <option value="Company">Company</option>
                    <option value="Individual">Individual</option>
                    <option value="Investor">Investor</option>
                    <option value="Trust">Trust</option>
                    </select>
                <br></br>
                <label>Owner Type: </label>
                <select onChange={(e)=>{setOwnerType(e.target.value)}}>
                    <option disabled selected value> -- select an option -- </option>
                    <option value="Competitor">Competitor</option>
                    <option value="Seller">Seller</option>
                    <option value="Investor">Investor</option>
                    <option value="Professional">Professional</option>
                    </select>
                <br></br>
                <label>Address: </label>
                <input type = "address" onChange={(e) => {setAddress(e.target.value)}} placeholder="address" required={true}/>
                <br></br>
                <input type = "Submit" onClick = {submit}/>

            </form>
            <br/>
            <p><a href="javascript:history.back()">Cancel</a></p>
            <br />

            
        </div>
    )
}

export default Add;