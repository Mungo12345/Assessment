import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../index.css'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'



function Home(){
    const navigate = useNavigate();
    const location = useLocation()
    sessionStorage.setItem("urlState", location.state.id);
    const urlState = sessionStorage.getItem("urlState");
    const [owners, setOwners] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/getOwners')
        .then(owners => setOwners(owners.data))
        .catch(err => console.log(err))
        axios.get('http://localhost:3000/getLandHoldings')
        .then(landholds => setLandHolds(landholds.data))
        .catch(err => console.log(err))

    }, [])
    const [landholds, setLandHolds] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/getLandHoldings')
        .then(landholds => setLandHolds(landholds.data))
        .catch(err => console.log(err))
        axios.get('http://localhost:3000/getOwners')
        .then(owners => setOwners(owners.data))
        .catch(err => console.log(err))
        

    }, [])

    const handleDeleteOwner = async(id)=>{
        const owners = await axios.delete("http://localhost:3000/deleteOwner/" + id)
        if(owners.data.success){
                axios.get('http://localhost:3000/getOwners')
                .then(owners => setOwners(owners.data))
                .catch(err => console.log(err))
                axios.get('http://localhost:3000/getLandHoldings')
                .then(landholds => setLandHolds(landholds.data))
                .catch(err => console.log(err))
            alert(owners.data.message)
        }
    }
    
    const handleDeleteLandHolding = async(id)=>{
        const landholds = await axios.delete("http://localhost:3000/deleteLandHolding/" + id)
        if(landholds.data.success){
                axios.get('http://localhost:3000/getLandHoldings')
                .then(landholds => setLandHolds(landholds.data))
                .catch(err => console.log(err))
                axios.get('http://localhost:3000/getOwners')
                .then(owners => setOwners(owners.data))
                .catch(err => console.log(err))
            alert(landholds.data.message)
        }
    }


    return(
        <div>
            <h1>Welcome {urlState} </h1>
            <h2>Owners</h2>
            
            <br></br>
            <div>
                <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Owner Name 
                        </th>
                        <th>
                            Entity Type 
                        </th>
                        <th>
                            Owner Type 
                        </th>
                        <th>
                            Address 
                        </th>
                        <th>
                            Land Holdings
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        owners.map(owner => {
                            return <tr>
                                <td>{owner.ownerName}</td>
                                <td>{owner.entityType}</td>
                                <td>{owner.ownerType}</td>
                                <td>{owner.address}</td>
                                <td>{owner.totalLand}</td> 
                                <td>{ !owner.fileName ? 'No File Uploaded' : <a href={'http://localhost:3000/' + owner.fileName}>Link to File</a> }</td>                              
                                    <button className="btn btn-edit" onClick={()=> navigate(`/EditOwner/${owner._id}`)}>Edit</button>
                                    <button className="btn btn-delete" onClick={()=>handleDeleteOwner(owner._id)}>Delete</button>
                                    <button className="btn btn-edit" onClick={()=> navigate(`/FileUploadOwner/${owner._id}`)}>File Upload</button>

                            </tr>
                        })
                    }
                </tbody>
            </table>
            <Link to= "/Add">Add an Owner</Link>
            <br></br>
            <h2>Land Holdings</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Land Name 
                        </th>
                        <th>
                            Owner
                        </th>
                        <th>
                            legal Entity
                        </th>
                        <th>
                            Net Mineral Acres
                        </th>
                        <th>
                            Mineral Owner Royalty
                        </th>
                        <th>
                            Section Name
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        landholds.map(landhold => {
                            return <tr>
                                <td>{landhold.name}</td>
                                <td>{landhold.ownerFrom}</td>
                                <td>{landhold.legalEntity}</td>
                                <td>{landhold.netMineralAcres}</td>
                                <td>{landhold.mineralOwnerRoyalty}</td>
                                <td>{landhold.sectionName}</td>
                                
                                <td>{ !landhold.fileName ? 'No File Uploaded' : <a href={'http://localhost:3000/' + landhold.fileName}>Link to File</a> }</td>

                                    <button className="btn btn-edit"onClick={()=> navigate(`/EditLandHolding/${landhold._id}`)}>Edit</button>
                                    <button className="btn btn-delete"onClick={()=>handleDeleteLandHolding(landhold._id)}>Delete</button>
                                    <button className="btn btn-edit" onClick={()=> navigate(`/FileUploadLand/${landhold._id}`)}>File Upload</button>

                            </tr>
                        })
                    }
                </tbody>
            </table>
            </div>
            </div>
            <br></br>
            <Link to= "/AddLand">Add a Land Holding</Link>

        </div>
    )
}

export default Home;