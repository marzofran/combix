import React, {useState} from 'react';
import {Col, Row, Form} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {modificarUsuario} from '../../../Redux/combixDucks'

const MisDatos = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((store) => store.combix.sesion);

  const [nombre, setNombre] = useState(usuario.nombre);
  const [apellido, setApellido] = useState(usuario.apellido);
  const [mail, setMail] = useState(usuario.mail);
  const [clave, setClave] = useState(usuario.clave);
  const [dni, setDni] = useState(usuario.dni);
  const [fecha, setFecha] = useState(usuario.fechaNacimiento);

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };
  const handleChangeApellido = (e) => {
    setApellido(e.target.value);
  };
  const handleChangeMail = (e) => {
    setMail(e.target.value);
  };
  const handleChangeDni = (e) => {
    setDni(e.target.value);
  };
  const handleChangeClave = (e) => {
    setClave(e.target.value);
  };
  const handleChangeFecha = (e) => {
    setFecha(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    if (esMayor(fecha)) {
      dispatch(
        dispatch(modificarUsuario(nombre,apellido,mail,clave,dni,fecha,usuario._id))
      );
    } else {
      alert('No es mayor de edad');
    }
  }

  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col-9'>
            <h3 style={{color: '#357185', padding: '5px 10px'}}> Mis Datos</h3>
          </div>
        </div>
        <Row>
          <Col>
            <h3 style={{paddingTop: '10px', fontSize: '20px'}}> Quiero cambiar mis datos </h3>
            <p>Ingrese todos sus datos, modificando aquellos que quiera cambiar</p>
            <Form id={'formularioPPal'} onSubmit={submitHandler}>
              <Form.Group controlId='nombre'>
                <Form.Label>Nombre/s</Form.Label>
                <Form.Control
                  required
                  type='name'
                  placeholder='Nombre/s'
                  name='nombre'
                  value={nombre}
                  onChange={handleChangeNombre}
                />
              </Form.Group>
              <Form.Group controlId='apellido'>
                <Form.Label>Apellido/s </Form.Label>
                <Form.Control
                  required
                  type='name'
                  placeholder='Apellido/s'
                  name='apellido'
                  value={apellido}
                  onChange={handleChangeApellido}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId='dni'>
                    <Form.Label>DNI</Form.Label>
                    <Form.Control
                      required
                      type='text'
                      minLength='7'
                      placeholder='DNI'
                      name='dni'
                      value={dni}
                      onChange={handleChangeDni}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='fechaNacimiento'>
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control
                      required
                      type='date'
                      name='fechaNacimiento'
                      value={fecha}
                      onChange={handleChangeFecha}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId='mail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type='email'
                  placeholder='Email'
                  name='mail'
                  value={mail}
                  onChange={handleChangeMail}
                />
              </Form.Group>
              <Form.Group controlId='clave'>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  required
                  minLength='6'
                  type='text'
                  name='clave'
                  value={clave}
                  onChange={handleChangeClave}
                />
              </Form.Group>
              <Row>
                <Col>
                  <button
                    className='btn btn-primary buttonGradient'
                    variant='primary'
                    type='submit'
                  >
                    Cambiar mis datos
                  </button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

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

export default MisDatos;