import Fetch from "../helpers/fetch";
import React, { useState } from "react"
import { Link } from "react-router-dom";


const initialParameters = {
    email: ""
}
const datos={
    type:'new-password',
    headers:{'Content-Type': 'application/json'},
    endPoint : 'api/newpassword',
    method:'POST'
}

const initialResponse = {
    message:'',
    error:''
}

function NewPassword(){

    const [params,setParams] = useState(initialParameters)

    const [response, setResponse] = useState(initialResponse)

    const updateParams = (property, value) => {
        setParams({
            ...params,
            [property]: value
        })
    }
    const submit = async (e) =>{
        e.preventDefault()
        

        await Fetch(datos,params)
        .then(res => res.json())
        .then(response => setResponse(response))
        .catch(error => alert(error))
    }

    if(response.error === 0){
        alert(response.message)
        response.error = ''
        window.location = '/'
    }else if(response.error !== 0 && response.error !== ''){
        alert(response.message)
        response.error = ''
    }


    return(
        <div className="container2">
            <div className="card">
            <h1 className="title">Recuperar contraseña!</h1>
            <form onSubmit={submit}>
                
            <div className="field">
            <label className="font-green" htmlFor="email"> email</label>
            <input className="input-field" id='email' name="email" type="email" onChange={(event) => updateParams(event.target.name, event.target.value)}></input>
            </div>
            <div>
                <input className="button" type="submit"></input>
            </div>
            </form>
            </div>
            <Link className="title" to="/">Volver al Login</Link>
        </div>
    )
}

export default NewPassword