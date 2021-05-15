import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Chofer from './elementos/chofer';
import {
  cargarChoferes,
  registrarChofer,
} from '../../../Redux/Admin/choferesDucks';

//Implementado, falta crud
const ChoferesAdmin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cargarChoferes());
  }, []);

  const [nombre, setNombre] = useState('Nombre');
  const [apellido, setApellido] = useState('Apellido');
  const [mail, setMail] = useState('Mail');
  const [DNI, setDNI] = useState('DNI');
  const [telefono, setTelefono] = useState('Telefono');
  const [fecha, setFecha] = useState('Fecha');

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };
  const handleChangeApellido = (e) => {
    setApellido(e.target.value);
  };
  const handleChangeMail = (e) => {
    setMail(e.target.value);
  };
  const handleChangeDNI = (e) => {
    setDNI(e.target.value);
  };
  const handleChangeTelefono = (e) => {
    setTelefono(e.target.value);
  };
  const handleChangeFecha = (e) => {
    setFecha(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (esMayor(fecha)) {
      dispatch(registrarChofer(nombre, apellido, mail, DNI, telefono, fecha));
    } else {
      alert('No es mayor de edad');
    }
  };
  const choferes = useSelector((store) => store.choferes.elementos);

  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col-9'>
            <h3 style={{color: '#357185', padding: '5px 10px'}}>Choferes</h3>
          </div>
          <div className='col'>
            <button
              type='button'
              className={'btn btn-primary btn-block'}
              style={{backgroundColor: '#145572'}}
              data-toggle='modal'
              data-target='#exampleModal'
            >
              + Crear nuevo chofer
            </button>
          </div>
        </div>
        <div className='col'>
          {choferes.map((item) => (
            <Chofer item={item} key={item._id}></Chofer>
          ))}
        </div>
      </div>
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='modalChofer'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalChofer'>
                Cargar nuevo chofer
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='nombre'>Nombre</label>
                  <input
                    required
                    type='text'
                    className='form-control'
                    id='nombre'
                    aria-describedby='Nombre'
                    placeholder='Ingresa el nombre'
                    onChange={handleChangeNombre}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='apellido'>Apellido</label>
                  <input
                    type='text'
                    className='form-control'
                    id='apellido'
                    aria-describedby='Apellido'
                    placeholder='Ingresa el apellido'
                    required
                    onChange={handleChangeApellido}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='mail'>Mail</label>
                  <input
                    type='email'
                    className='form-control'
                    id='mail'
                    aria-describedby='Mail'
                    placeholder='Ingresa el mail'
                    required
                    onChange={handleChangeMail}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='DNI'>DNI</label>
                  <input
                    type='text'
                    className='form-control'
                    id='DNI'
                    aria-describedby='DNI'
                    placeholder='Ingresa el DNI'
                    required
                    onChange={handleChangeDNI}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='telefono'>Telefono</label>
                  <input
                    type='text'
                    className='form-control'
                    id='telefono'
                    aria-describedby='Telefono'
                    placeholder='Ingresa el telefono'
                    required
                    onChange={handleChangeTelefono}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='fecha'>Fecha de nacimiento</label>
                  <input
                    type='date'
                    className='form-control'
                    id='fecha'
                    aria-describedby='Fecha'
                    placeholder='Ingresa la fecha de nacimiento'
                    required
                    onChange={handleChangeFecha}
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{backgroundColor: '#145572'}}
                >
                  Guardar chofer
                </button>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
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

export default ChoferesAdmin;
