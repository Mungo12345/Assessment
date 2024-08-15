import React, {useState} from "react";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";


function FileOwner(){
    const history = useNavigate();
    const {id} = useParams();
    const [file, setFile] = useState();

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }
    const handleUpload = () =>{
        const formdata = new FormData();
        formdata.append('id', id)
        formdata.append('image', file);
        axios.post('https://backend-ewdk.onrender.com/uploadOwnerFile/'+ id,formdata)
        .then(history("/home", {state:{id:sessionStorage.getItem("urlState")}}))
        .catch(err => console.log(err))

    }
    return(
        <div>
            <input type = "file" name = 'file' onChange = {handleFile}/>
            <button onClick={handleUpload}>Submit</button>
        </div>
    )
}

export default FileOwner;