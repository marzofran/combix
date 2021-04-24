import {useState, useEffect} from 'react'
import Axios from 'axios'

const UserRegisterForm = callback => {
    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        fechaNacimiento: '',
        mail: '',
        clave: '',
        repetirClave: ''
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
                dni: values.dni,
                fechaNacimiento: values.fechaNacimiento,
                mail: values.mail,
                clave: values.clave
            }

            Axios
            .post('/users', newUser )
            .then(response => {
                console.log('El registro fue exitoso')
                // login
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if(!values.dni.trim()){
        errors.dni = "dni requerido"
    } else if (values.dni.length < 7){
        errors.dni = "dni invalido"
    }
    if(!values.fechaNacimiento.trim()){
        errors.fechaNacimiento = "Fecha de nacimiento requerida"
    }
    if(!values.mail.trim()){
        errors.mail = "Email requerido"
    } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ){
        errors.mail = "Email inválido"
    }
    if(!values.clave){
        errors.clave = "Contraseña requerida"
    } else if (values.clave.length < 6){
        errors.clave = "6 caracteres mínimo"
    }
    if(!values.repetirClave){
        errors.repetirClave = "Contraseña requerida"
    } else if (values.clave !== values.repetirClave){
        errors.repetirClave = "Las contraseñas no concuerdan"
    }

    return errors
}

export default UserRegisterForm

