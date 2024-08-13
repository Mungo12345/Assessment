import React, {useEffect, useState} from "react";
import axios from "axios"
import { useNavigate, Link, useParams } from "react-router-dom";
import urlState from "./HomeComponent"



function EditOwner(){
    const history = useNavigate();
    const {id} = useParams();
    const [values, setValues] = useState({
        id: id,
        ownerName: '',
        entityType: '',
        ownerType: '',
        address: ''
    })

    useEffect(()=> {
        axios.get('http://localhost:3000/getOwner/' + id)
        .then(res => {
            setValues({...values, ownerName: res.data.ownerName,entityType:res.data.entityType, ownerType:res.data.ownerType, address:res.data.address})
        })
        .catch(err => console.log(err))
    }, [])
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!values.ownerName||!values.entityType||!values.ownerType||!values.address){
            return alert("Please fill in all details");
        }
        axios.put('http://localhost:3000/updateOwner/' + id,{
            values
        })
        .then(history("/home", {state:{id:sessionStorage.getItem("urlState")}}))
        .catch(err => console.log(err))
    }
    return(
        <div>
            <h1>Edit Owner Details</h1>

            <form>
                <input type = "ownerName" placeholder="ownerName" required={true}
                value={values.ownerName} onChange={e => setValues({...values, ownerName:e.target.value})}/>
                <br></br>
                <label>Entity Type: </label>
                <select onChange={e => setValues({...values, entityType:e.target.value})}>
                    <option disabled selected value = {values.entityType}> {values.entityType} </option>
                    <option value="Company">Company</option>
                    <option value="Individual">Individual</option>
                    <option value="Investor">Investor</option>
                    <option value="Trust">Trust</option>
                    </select>
                <br></br>
                <label>Owner Type: </label>
                <select onChange={e => setValues({...values, ownerType:e.target.value})}>
                    <option disabled selected value = {values.ownerType}> {values.ownerType} </option>
                    <option value="Competitor">Competitor</option>
                    <option value="Seller">Seller</option>
                    <option value="Investor">Investor</option>
                    <option value="Professional">Professional</option>
                    </select>
                <br></br>
                <input type = "address"  placeholder="address" required={true}
                value={values.address} onChange={e => setValues({...values, address:e.target.value})}/>
                <br></br>
                <input type = "Submit" onClick = {handleSubmit}/>

            </form>
            <br/>
            <p><a href="javascript:history.back()">Cancel</a></p>
            <br />

            
        </div>
    )
}

export default EditOwner;