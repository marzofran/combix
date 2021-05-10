import {useState, useEffect} from 'react';
import {store} from '../Redux/store';
import {registrarUsuario} from '../Redux/combixDucks';

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

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
        mail: values.mail,
        clave: values.clave,
        telefono: 0
      };

      store.dispatch(registrarUsuario(newUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return {handleChange, values, handleSubmit, errors};
};

function validateInfo(values) {
  let errors = {};
  if (values.clave !== values.repetirClave) {
    errors.repetirClave = 'Las contraseñas no concuerdan';
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
