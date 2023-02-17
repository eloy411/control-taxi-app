import React from "react";

function Succes(){

    const exit=()=>{
        window.location = '/'
    }

    const otra=()=>{
        window.location = '/#/denuncia'
    }

    return (
        <div className="container2">
            <h1 className="font-green">Denuncia Registrada!</h1>
            <h3 className="title">Quiere hacer otra denuncia o prefiere salir?</h3>
            
            <button className="button" onClick={otra}>Hacer Otra</button>
            
            <button className="button" onClick={exit}>Salir</button>
        </div>
    )
}

export default Succes