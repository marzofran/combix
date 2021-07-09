import { useState, useEffect } from 'react';
import storeInstance from '../Redux/storeInstance';
import { registrarUsuario } from '../Redux/combixDucks';
import { registrarUsuarioChofer } from '../Redux/choferDucks';

const UserRegisterForm = (callback) => {
  const [values, setValues] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    mail: '',
    clave: '',
    repetirClave: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tipo, editTipo] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editTipo('cliente');
    setErrors(validateInfo(values));
    setIsSubmitting(true);
  };
  const handleSubmitChofer = (event) => {
    event.preventDefault();
    editTipo('chofer');
    setErrors(validateInfo(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const newUser = {
        nombre: values.nombre,
        apellido: values.apellido,
        dni: values.dni,
        fechaNacimiento: values.fechaNacimiento,
        mail: values.mail.toLowerCase(),
        clave: values.clave,
        telefono: 0,
      };
      if (tipo === 'cliente') {
        storeInstance.dispatch(registrarUsuario(newUser));
      } else {
        storeInstance.dispatch(registrarUsuarioChofer(newUser));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return { handleChange, values, handleSubmit, errors, handleSubmitChofer };
};

function validateInfo(values) {
  let errors = {};
  if (values.clave !== values.repetirClave) {
    errors.repetirClave = 'Las contraseñas no concuerdan';
    console.log("errorcito")
  }
  if (!esMayor(values.fechaNacimiento)) {
    errors.fechaNacimiento = 'Debes ser mayor de 18 años';
  }
  return errors;
}

function esMayor(date) {
  var today = new Date();
  var birthDate = new Date(date);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age > 18;
}

export default UserRegisterForm;
