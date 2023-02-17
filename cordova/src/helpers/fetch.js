// import axios from 'axios'

const Fetch = async (datos, formData) => {

    const url = datos.endPoint

    if (datos?.method) {

        if (datos.type === 'login' || datos.type === 'register' || datos.type === 'new-password') {
            var data = JSON.stringify(formData)
        } else {
            var data = formData
        }
        console.log(data)
        const requestOptions = {
            method: datos.method,
            headers: datos.headers,
            body: data
        }

        // console.log(datos.body.get('nivel'))

        try {

            return await fetch(`https://control-taxi.onrender.com/${url}`, requestOptions)
        } catch (error) {
            console.log(error)
        }

    } else {

        return fetch(`https://control-taxi.onrender.com/${url}`)
    }
}

export default Fetch