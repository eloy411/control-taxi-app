import { useState, useEffect } from "react"
import Fetch from "../helpers/fetch";
import { Link } from "react-router-dom"
// import { render } from "react-dom/cjs/react-dom.production.min";
// const objDenuncias = require('./prueba.json')

// const objData = {
//     rol: ''
// }


const initialObjDenuncias = {
    cliente: [],
    conductor: []
}
const initialParamsDenuncia = {
    "licencia": '',
    "matricula": '',
    "nivel": '',
    "explicacion": '',
    "file": {}
}
const initialResponse = {
    message: '',
    error: ''
}


function Denuncia() {

    const data = window.localStorage.getItem('token')
    const objData = JSON.parse(data)

    const [objDenuncias, setObjDenuncias] = useState(initialObjDenuncias)
    const [archivo, setArchivo] = useState(null)
    const [params, setParams] = useState(initialParamsDenuncia)
    const [response, setResponse] = useState(initialResponse)
    const [loading, setLoading] = useState(true)


    const datos = {
        type: 'denuncia',
        headers: {
            'Accept': 'multipart/form-data',
            Authorization: data
        },
        endPoint: '',
        method: 'POST'
    }


    const downloadDenuncias = async () => {
        await Fetch({ endPoint: 'api/listadenuncias' })
            .then(res => res.json())
            .catch(error => setObjDenuncias({ cliente: ['error', 'error'] }))
            .then(response => setObjDenuncias(response))

        setLoading(false)
    }

    const updateParams = (property, value) => {
        setParams({
            ...params,
            [property]: value
        })
    }
   
    const uploadFile = (e) => {
        setArchivo(e)
        
    }
    
    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('licencia', params.licencia)
        formData.append('matricula', params.matricula)
        formData.append('nivel', params.nivel)
        formData.append('explicacion', params.explicacion)

        if (archivo != null) {
            formData.append('file', archivo[0])
        }



        await Fetch(datos, formData)
            //  .then(()=>{formData.delete('file')})
            .then(res => res.json())
            .catch(error => alert(error))
            .then(response => setResponse(response))

        setLoading(false)
    }




    if (response.error === 0) {

        window.location = '/#/succes'
    } else if (response.error !== 0 && response.error !== '') {
        alert(response.message)

        response.error = ''
        // window.location='/#/denuncia'
    }


    



    useEffect(() => {
        downloadDenuncias()

    }, [])


    if (objData.rol === 'cliente' && loading === false) {
        datos.endPoint = 'api/cliente/denuncia'


        return (

            <div className="container">
                <div className="space"></div>
                <div className="card-denuncia">
                    <h2 className="title">Realice su denuncia</h2>
                    <form id="denuncia" className="form" onSubmit={submit}>

                        <div className="field">
                            <label htmlFor="licencia" className="font-green">Licencia</label>
                            <input className="input-field" type="text" name="licencia" id="licencia" onChange={(event) => updateParams(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <label htmlFor="matricula" className="font-green">Matricula</label>
                            <input className="input-field" type="text" name="matricula" id="matricula" onChange={(event) => updateParams(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <select name="nivel" id="infraccion" onChange={(event) => updateParams(event.target.name, event.target.value)}>
                                {objDenuncias.cliente.map((denuncia) => {
                                    return <option key={denuncia[0]} value={denuncia[0]}>{denuncia[1]}</option>
                                })}

                            </select>
                        </div>
                        <div className="field">

                            <textarea className="input-field" type="text" name="explicacion" placeholder="explica lo ocurrido lo mas breve posible" id="explicacion" onChange={(event) => updateParams(event.target.name, event.target.value)}></textarea>
                        </div>
                        <h2 className="title">Inserte imagen</h2>
                        <div className="field">

                            <input className="input-field" type="file" name="file" placeholder="inserte imagen/viedo" onChange={(event) => uploadFile(event.target.files)}></input>
                        </div>


                        <button className="button" type="submit" >Enviar</button>
                        <br></br>
                    </form>
                </div>
                <Link className="title" to="/">Cerrar sesión</Link>
            </div>
        )
    } else if (objData.rol === 'conductor' && loading === false) {
        datos.endPoint = 'api/conductor/denuncia'

        return (
            // <h1>h</h1>
            <div className="container">
                <div className="space"></div>
                <div className="card-denuncia">
                    <h2 className="title">Realice su denuncia</h2>
                    <form id="denuncia" className="form" >

                        <div className="field">
                            <label htmlFor="licencia" className="font-green">Licencia</label>
                            <input className="input-field" type="text" name="licencia" id="licencia" onChange={(event) => updateParams(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <label htmlFor="matricula" className="font-green">Matricula</label>
                            <input className="input-field" type="text" name="matricula" id="matricula" onChange={(event) => updateParams(event.target.name, event.target.value)}></input>
                        </div>
                        <div className="field">
                            <select name="nivel" id="infraccion" onChange={(event) => updateParams(event.target.name, event.target.value)}>
                                {objDenuncias.conductor.map((denuncia) => {
                                    return <option key={denuncia[0]} value={denuncia[0]}>{denuncia[1]}</option>
                                })}

                            </select>
                        </div>
                        <div className="field">

                            <textarea className="input-field" type="text" name="explicacion" placeholder="explica lo ocurrido lo mas breve posible" id="explicacion" onChange={(event) => updateParams(event.target.name, event.target.value)}></textarea>
                        </div>
                        <h2 className="title">Inserte imagen</h2>
                        <div className="field">

                            <input className="input-field" type="file" name="file" placeholder="inserte imagen/viedo" onChange={(event) => uploadFile(event.target.files)}></input>
                        </div>


                        <button className="button" type="submit" onClick={submit}>Enviar</button>
                        <br></br>

                    </form>
                </div>
                <Link className="title" to="/">Cerrar sesión</Link>
                <button>INFORMACIÓN</button>
            </div>
        )

    } else {
        return (
            <div className="container2">
                <div className="spinner">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <h2 className="title">Procesando</h2>
            </div>
        )
    }
}





export default Denuncia