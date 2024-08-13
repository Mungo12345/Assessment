import React, {useEffect, useState} from "react";
import axios from "axios"
import { useNavigate, Link, useParams } from "react-router-dom";
import urlState from "./HomeComponent"



function EditLandHolding(){
    const history = useNavigate();
    const {id} = useParams();
    const [values, setValues] = useState({
        id:id,
        name:"",
        ownerID:"",
        ownerFrom: '',
        legalEntity: '',
        netMineralAcres: '',
        mineralOwnerRoyalty: '',
        sectionName: "",
        section:'',
        township:"",
        range:"",
        titleSource: '',
        townshipBeg: '',
        townshipEnd: '',
        rangeBeg: '',
        rangeEnd: '',
        prevOwnerID: ''
        
    })

    useEffect(()=> {
        axios.get('https://backend-ewdk.onrender.com/getLandHolding/' + id)
        .then(res => {
            setValues({...values, name : res.data.name,
                ownerID: res.data.ownerID,
                ownerFrom: res.data.ownerFrom,
                legalEntity:res.data.legalEntity,
                netMineralAcres:res.data.netMineralAcres,
                mineralOwnerRoyalty:res.data.mineralOwnerRoyalty,
                sectionName: res.data.sectionName,
                section:res.data.section,
                township:res.data.township,
                townshipBeg:res.data.township.slice(0,-1),
                townshipEnd:res.data.township.slice(-1),
                range:res.data.range,
                rangeBeg:res.data.range.slice(0,-1),
                rangeEnd:res.data.range.slice(-1),
                titleSource:res.data.titleSource,
                prevOwnerID:res.data.ownerID
                })
        })
        .catch(err => console.log(err))
    }, [])
  
    const [owners, setOwners] = useState([])
    useEffect(()=>{
        axios.get('https://backend-ewdk.onrender.com/getOwners')
        .then(owners => setOwners(owners.data))
        .catch(err => console.log(err))

    }, []) 

     const handleSubmit = (e) => {
        e.preventDefault();
        if(!values.ownerID || !values.legalEntity || !values.netMineralAcres || !values.mineralOwnerRoyalty || !values.section
            ||!values.townshipBeg || !values.townshipEnd|| !values.rangeBeg || !values.rangeEnd || !values.titleSource
        ){
            return alert("Please fill in all details");
        }
        axios.put('https://backend-ewdk.onrender.com/updateLandHolding/' + id,{
            values
        })
        .then(history("/home", {state:{id:sessionStorage.getItem("urlState")}}))
        .catch(err => console.log(err))
    }
    return(
        <div>
            <h1>Edit Land Hold Details</h1>

            <form action = "POST">
                <label>Owners: </label>
                <select  onChange={e => setValues({...values, ownerID:e.target.value})}>
                    <option disabled selected value={values.ownerFrom}> {"Current Owner: " + values.ownerFrom} </option>
                    {
                        owners.map(owner => {
                            return (<option value={owner._id}>{"Owner Name: " + owner.ownerName + " Address: "+owner.address}</option>)
                        })
                    }
                </select>
                <br></br>
                <input type = "legalEntity" value={values.legalEntity} onChange={e => setValues({...values, legalEntity:e.target.value})} placeholder="Legal Entity" />
                <br></br>
                <input type = "netMineralAcres" value={values.netMineralAcres} onChange={e => setValues({...values, netMineralAcres:e.target.value})} placeholder="Net Mineral Acres" />
                <br></br>
                <input type = "mineralOwnerRoyalty" value={values.mineralOwnerRoyalty} onChange={e => setValues({...values, mineralOwnerRoyalty:e.target.value})} placeholder="Mineral Owner Royalty (%)" />
                <br></br>
                
                <input onKeyDown={(e) => !/[0-9]|Backspace/.test(e.key) && e.preventDefault()}  maxLength={3}  value={values.section} onChange={e => setValues({...values, section:e.target.value})} placeholder="Section (3 numbers)" />
                <br></br>
                <input onKeyDown={(e) => !/[0-9]|Backspace/.test(e.key) && e.preventDefault()} maxLength={3} value={values.townshipBeg} onChange={e => setValues({...values, townshipBeg:e.target.value})} placeholder="Township (3 numbers)" />
                <select  onChange={e => setValues({...values, townshipEnd:e.target.value})}>
                    <option disabled selected value = {values.townshipEnd}> {values.townshipEnd} </option>
                    <option value="N">N</option>
                    <option value="S">S</option>
                    </select>
                <br></br>
                <input onKeyDown={(e) => !/[0-9]|Backspace/.test(e.key) && e.preventDefault()} maxLength={3} value={values.rangeBeg} onChange={e => setValues({...values, rangeBeg:e.target.value})} placeholder="Range (3 numbers)" />
                <select onChange={e => setValues({...values, rangeEnd:e.target.value})}>
                    <option disabled selected value = {values.rangeEnd}> {values.rangeEnd} </option>
                    <option value="E">E</option>
                    <option value="W">W</option>
                    </select>
                <br></br>
                <label>Title Source: </label>
                <select onChange={e => setValues({...values, titleSource:e.target.value})}>
                    <option disabled selected value = {values.titleSource}> {values.titleSource} </option>
                    <option value="Class A">Class A</option>
                    <option value="Class B">Class B</option>
                    <option value="Class C">Class C</option>
                    <option value="Class D">Class D</option>
                    </select>
                <br></br>
                <input type = "Submit" onClick = {handleSubmit}/>

            </form>
            <br/>
            <p><a href="javascript:history.back()">Cancel</a></p>
            <br />

            
        </div>
    )
}

export default EditLandHolding;