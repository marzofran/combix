import {useState, useEffect} from 'react'
import Axios from 'axios'

const UserRegisterForm = callback => {
    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        DNI: '',
        fecha: '',
        email: '',
        contrasena: '',
        repetirContrasena: ''
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        
        setErrors(validateInfo(values))
        setIsSubmitting(true)
      }

      useEffect(()=>{
        if(Object.keys(errors).length === 0 && isSubmitting){
            const newUser = {
                nombre: values.nombre,
                apellido: values.apellido,
                DNI: values.DNI,
                fecha: values.fecha,
                email: values.email,
                contrasena: values.contrasena
            }

            Axios
            .post('/users', newUser )
            .then(response => {
                console.log('El registro fue exitoso')
            })
        }},[errors])

    return {handleChange, values, handleSubmit, errors}
}

function validateInfo(values){
    let errors = {}
    if(!values.nombre.trim()){
        errors.nombre = "Nombre requerido"
    }
    if(!values.apellido.trim()){
        errors.apellido = "Apellido requerido"
    }
    if(!values.DNI.trim()){
        errors.DNI = "DNI requerido"
    } else if (values.DNI.length < 7){
        errors.DNI = "DNI invalido"
    }
    if(!values.fecha.trim()){
        errors.fecha = "Fecha de nacimiento requerida"
    }
    if(!values.email.trim()){
        errors.email = "Email requerido"
    } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ){
        errors.email = "Email inválido"
    }
    if(!values.contrasena){
        errors.contrasena = "Contraseña requerida"
    } else if (values.contrasena.length < 6){
        errors.contrasena = "6 caracteres mínimo"
    }
    if(!values.repetirContrasena){
        errors.repetirContrasena = "Contraseña requerida"
    } else if (values.contrasena !== values.repetirContrasena){
        errors.repetirContrasena = "Las contraseñas no concuerdan"
    }

    return errors
}

export default UserRegisterForm

