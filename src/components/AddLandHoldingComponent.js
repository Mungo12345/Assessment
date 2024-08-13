import React, {useEffect,useState} from "react";
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";
import urlState from "./HomeComponent"

function AddLand(){
    const history = useNavigate();
    const [ownerID,setOwnerID] = useState('')
    const [legalEntity,setlegalEntity] = useState(null)
    const [netMineralAcres,setNetMineralAcres] = useState(null)
    const [mineralOwnerRoyalty,setMineralOwnerRoyalty] = useState('')
    const [section,setSection] = useState('')
    const [townshipBeg,setTownshipBeg] = useState(null)
    const [townshipEnd,setTownshipEnd] = useState(null)
    const [rangeBeg,setRangeBeg] = useState(null)
    const [rangeEnd,setRangeEnd] = useState(null)
    const [titleSource,setTitleSource] = useState('')
    async function submit(e){
        e.preventDefault();
        if(!ownerID || !legalEntity || !netMineralAcres || !mineralOwnerRoyalty || !section
            ||!townshipBeg || !townshipEnd|| !rangeBeg || !rangeEnd || !titleSource
        ){
            return alert("Please fill in all details");
        }
        try{
            await axios.post("http://localhost:3000/AddLand", {
                ownerID,legalEntity,netMineralAcres,mineralOwnerRoyalty,section,townshipBeg,townshipEnd,rangeBeg,rangeEnd,titleSource
            })
            .then(
                history("/home", {state:{id:sessionStorage.getItem("urlState")}})
        )
            .catch(e=>{
                alert("Wrong details")
                console.log(e);
            })
        }
        catch(e){
            console.log(e);
        }
        
    }
    const [owners, setOwners] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/getOwners')
        .then(owners => setOwners(owners.data))
        .catch(err => console.log(err))

    }, [])
    
    return(
        <div>
            
            <h1>Add Owner Details</h1>

            <form action = "POST">
                <label>Owners: </label>
                <select onChange={(e)=>{setOwnerID(e.target.value)}}>
                    <option disabled selected value> -- select an option -- </option>
                    {
                        owners.map(owner => {
                            return (<option value={owner._id}>{"Owner Name: " + owner.ownerName + " Address: "+owner.address}</option>)
                        })
                    }
                </select>
                <br></br>
                <input type = "legalEntity" onChange={(e) => {setlegalEntity(e.target.value)}} placeholder="Legal Entity" />
                <br></br>
                <input type = "netMineralAcres" onChange={(e) => {setNetMineralAcres(e.target.value)}} placeholder="Net Mineral Acres" />
                <br></br>
                <input type = "mineralOwnerRoyalty" onChange={(e) => {setMineralOwnerRoyalty(e.target.value)}} placeholder="Mineral Owner Royalty (%)" />
                <br></br>

                <input onKeyDown={(e) => !/[0-9]|Backspace/.test(e.key) && e.preventDefault()}  maxLength={3}  onChange={(e) => {setSection(e.target.value)}} placeholder="Section (3 numbers)" />
                <br></br>
                <input onKeyDown={(e) => !/[0-9]|Backspace/.test(e.key) && e.preventDefault()} maxLength={3} onChange={(e) => {setTownshipBeg(e.target.value)}} placeholder="Township (3 numbers)" />
                <select onChange={(e)=>{setTownshipEnd(e.target.value)}}>
                    <option disabled selected value> -- select an option -- </option>
                    <option value="N">N</option>
                    <option value="S">S</option>
                    </select>
                <br></br>
                <input onKeyDown={(e) => !/[0-9]|Backspace/.test(e.key) && e.preventDefault()} maxLength={3} onChange={(e) => {setRangeBeg(e.target.value)}} placeholder="Range (3 numbers)" />
                <select onChange={(e)=>{setRangeEnd(e.target.value)}}>
                    <option disabled selected value> -- select an option -- </option>
                    <option value="E">E</option>
                    <option value="W">W</option>
                    </select>
                <br></br>
                <label>Title Source: </label>
                <select onChange={(e)=>{setTitleSource(e.target.value)}}>
                    <option disabled selected value> -- select an option -- </option>
                    <option value="Class A">Class A</option>
                    <option value="Class B">Class B</option>
                    <option value="Class C">Class C</option>
                    <option value="Class D">Class D</option>
                    </select>
                <br></br>
                <input type = "Submit" onClick = {submit}/>

            </form>
            <br/>
            <p><a href="javascript:history.back()">Cancel</a></p>
            <br />

            
        </div>
    )
}

export default AddLand;