import Fetch from "../helpers/fetch";
import React, { useState } from "react"
import { Link } from "react-router-dom";


const initialParametersCliente = {
    rol: "cliente",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    password: "",
    twin: ""
}
const initialParametersConductor = {
    rol: "conductor",
    licencia: "",
    matricula: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    password: "",
    twin: ""
}
const initialResponse = {
    message: '',
    error: ''
}

const datos = {
    type: 'register',
    headers: { 'Content-Type': 'application/json' },
    endPoint: '',
    body: {},
    method: 'POST'
}

function Register() {

    const [rol, setRol] = useState('');

    const [cliente, setCliente] = useState(initialParametersCliente)

    const [conductor, setConductor] = useState(initialParametersConductor)

    const [response, setResponse] = useState(initialResponse)


    const changeRol = (event) => {
        setRol(event.target.value)
    }

    const updateCliente = (property, value) => {
        setCliente({
            ...cliente,
            [property]: value
        })
    }
    const updateConductor = (property, value) => {
        setConductor({
            ...conductor,
            [property]: value
        })
    }

    const submit = async (e) => {
        e.preventDefault()

        datos.rol = rol

        if (datos.rol === 'cliente') {
            datos.endPoint = "api/cliente/singup"
            datos.body = cliente
        }
        else if (datos.rol === 'conductor') {
            datos.endPoint = 'api/conductor/singup'
            datos.body = conductor
        } else {
            return alert('error en ROL')
        }


        await Fetch(datos, datos.body)
            // .then((res)=>alert(res))
            .then(res => res.json())
            .then(response => setResponse(response))
            .catch(error => alert(error))


    }

    if (response.error === 0) {
        alert(response.message)
        response.error = ''
        window.location = '/'
    } else if (response.error !== 0 && response.error !== '') {
        alert(response.message)
        response.error = ''
    }

    //RENDER ________________________________HTML
    if (rol === 'cliente' || rol === '') {
        return (
            <div className="container">
                <div className="card">
                    <form id="form-cliente" onSubmit={submit} className="form">
                        <div>
                            <h2 className="title">Registro</h2>
                        </div>
                        <div className="field">
                            <select onChange={changeRol}>
                                <option value=''>Rol</option>
                                <option value="cliente">Cliente</option>
                                <option value="conductor">Conductor</option>
                            </select>
                        </div>

                        <input className="input-field" type="hidden" name="rol" value="cliente"></input>

                        <div className="field">
                            <label htmlFor="nombre" className="font-green">Nombre</label>
                            <input className="input-field" type="text" name="nombre" placeholder="nombre" onChange={(event) => updateCliente(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <label htmlFor="apellido" className="font-green">Apellido</label>
                            <input className="input-field" type="text" name="apellido" placeholder="apellido" onChange={(event) => updateCliente(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <label htmlFor="telefono" className="font-green">Teléfono</label>
                            <input className="input-field" type="text" name="telefono" placeholder="tel" onChange={(event) => updateCliente(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <label htmlFor="email" className="font-green">Email</label>
                            <input className="input-field" type="text" name="email" placeholder="email" onChange={(event) => updateCliente(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <label htmlFor="password" className="font-green">Password</label>
                            <input className="input-field" type="text" name="password" placeholder="pass" onChange={(event) => updateCliente(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <label htmlFor="twin" className="font-green">Repita password</label>
                            <input className="input-field" type="text" name="twin" placeholder="repitapass" onChange={(event) => updateCliente(event.target.name, event.target.value)}></input>
                        </div>



                        <button className="button" type="submit">Cliente</button>

                    </form>
                </div>
                <Link className="title" to="/">Volver al Login</Link>
            </div>
        )
    } else if (rol === 'conductor') {

        return (
            <div className="container">
                <div className="card">
                    <form id="form-conductor" method="post" className="form" onSubmit={submit} >
                        <div>
                            <h2 className="title">Registro</h2>
                        </div>
                        <div className="field">
                            <select onChange={changeRol}>
                                <option value=''>Rol</option>
                                <option value="cliente">Cliente</option>
                                <option value="conductor">Conductor</option>
                            </select>
                        </div>

                        <input className="input-field" type="hidden" name="rol" value="conductor"></input>

                        <div className="field">
                            <label className="font-green" htmlFor="licencia">Licencia</label>
                            <input className="input-field" type="text" name="licencia" placeholder="licencia" onChange={(event) => updateConductor(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <label className="font-green" htmlFor="matricula">Matricula</label>
                            <input className="input-field" type="text" name="matricula" placeholder="matrícula" onChange={(event) => updateConductor(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <label htmlFor="nombre" className="font-green">Nombre</label>
                            <input className="input-field" type="text" name="nombre" placeholder="nombre" onChange={(event) => updateConductor(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <label htmlFor="apellido" className="font-green">Apellido</label>
                            <input className="input-field" type="text" name="apellido" placeholder="apellido" onChange={(event) => updateConductor(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <label htmlFor="telefono" className="font-green">Teléfono</label>
                            <input className="input-field" type="text" name="telefono" placeholder="tel" onChange={(event) => updateConductor(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <label htmlFor="email" className="font-green">Email</label>
                            <input className="input-field" type="text" name="email" placeholder="email" onChange={(event) => updateConductor(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <label htmlFor="password" className="font-green">Password</label>
                            <input className="input-field" type="password" name="password" placeholder="pass" onChange={(event) => updateConductor(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <label htmlFor="twin" className="font-green">Repita password</label>
                            <input className="input-field" type="password" name="twin" placeholder="repitapass" onChange={(event) => updateConductor(event.target.name, event.target.value)}></input>
                        </div>
                        <button className="button" type="submit">Cliente</button>
                    </form>
                </div>
                <Link className="title" to="/">Volver al Login</Link>
            </div>
        )

    }
}

export default Register
