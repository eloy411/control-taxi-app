import { useState } from "react"
import Fetch from "../helpers/fetch";
import { Link } from "react-router-dom"
import logo from "../assets/CONTROL2.png"


const initialParameters = {
    email:'',
    password:'',
    rol:''
}
const initialResponse = {
    error:'',
    token:'',
    id:'',
    message:''
}

const datos={
    type:'login',
    body:{},
    headers:{'Content-Type':'application/json'},
    endPoint:'',
    method:'POST'
}

function Login(){

    const [rol,setRol] = useState('')
    const [response,setResponse] = useState(initialResponse)
    const [params,setParams] = useState(initialParameters)
    
    const changeRol =(event)=>{
        setRol(event.target.value)
    }

    const updateParams = (property, value) => {
        setParams({
            ...params,
            [property]: value
        })
    }

    const submit =async (e)=>{
        e.preventDefault()

        params.rol = rol
        

        if(rol==='cliente'){
            datos.endPoint = "api/cliente/singin"
        }
        else if(rol === 'conductor'){
            datos.endPoint = 'api/conductor/singin' 
        }else{
            return alert('error en ROL')
        }
        await Fetch(datos,params)
             .then(res=>res.json())
             .catch(error=>alert(error))
             .then(response=>setResponse(response))
    }
    
    if(response.error === 0){
        window.localStorage.setItem('token',JSON.stringify(response))
        window.location='/#/denuncia'
    }else if(response.error !== 0 && response.error != ''){
        alert(JSON.stringify(response))
        
    }
    response.error = ''
    return(
        <div className="container">
            <div className="container-img"><img src={logo}></img></div>
        <div className="card">
        <form id="singin" onSubmit={submit} >
        <div>
        <select name="rol" onChange={changeRol} className="select">
            <option value=''>Escoge tu Rol</option>
            <option value="conductor">Conductor</option>
            <option value="cliente">Cliente</option>
        </select>
        </div>
        <div className="field">
        <input className="input-field" type="text" name="email" placeholder="email" onChange={(event) => updateParams(event.target.name, event.target.value)}></input>
        </div>
        <div className="field">
        <input className="input-field" type="password" name="password" placeholder="contraseña" onChange={(event) => updateParams(event.target.name, event.target.value)}></input>
        </div>
        <div className="">
        <input className="button" type="submit" value="Iniciar Sesión"></input>
        </div>
        
        <Link to="register" className="btn-link">registrate</Link>
        <Link to="new-password" className="btn-link">has olvidado la contraseña?</Link>
    </form>
    </div>
    </div>

    )
}

export default Login