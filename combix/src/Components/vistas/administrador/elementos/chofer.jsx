import React, { useState } from 'react';
import { Accordion, Card, Modal, Button } from 'react-bootstrap';
import { darDeAltaChofer } from '../../../../Redux/Admin/choferesDucks';
import { useDispatch } from 'react-redux';
import {
  borrarChofer,
  editarChofer,
} from '../../../../Redux/Admin/choferesDucks';
import { borradoFisicoChofer } from '../../../../Redux/Admin/choferesDucks';
const { dateFormat } = require('../../../../scripts/dateFormat');

//Implementado, falta crud
const Chofer = (props) => {
  const dispatch = useDispatch();

  const [nombre, setNombre] = useState(props.item.nombre);
  const [apellido, setApellido] = useState(props.item.apellido);
  const [mail, setMail] = useState(props.item.mail);
  const [DNI, setDNI] = useState(props.item.dni);
  const [telefono, setTelefono] = useState(props.item.telefono);
  const [fecha, setFecha] = useState(props.item.fechaNacimiento);

  //Handlers del  modal de elimar
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      dispatch(
        editarChofer(
          nombre,
          apellido,
          mail,
          DNI,
          telefono,
          fecha,
          props.item._id
        )
      );
    } else {
      alert('No es mayor de edad');
    }
  };
  //Implementacion de mostar desactivados
  let clasesCss = 'db-element-header  ';

  if (props.item.unavailable) {
    clasesCss = 'db-element-header-variant ';
  }
  return (
    <Accordion className='row db-element'>
      <Card className='col'>
        <Card.Header className={clasesCss + 'row'}>
          <Accordion.Toggle
            className={clasesCss + 'col-11'}
            as={Card.Body}
            eventKey='0'
          >
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Nombre:</label>
                <h6 className='field-display'>
                  {props.item.nombre} {props.item?.apellido}
                </h6>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Mail:</label>
                <h6 className='field-display'>{props.item?.mail}</h6>
              </div>
            </div>
          </Accordion.Toggle>
          {!props.item.unavailable ? (
            <div className='col-1'>
              <button
                data-toggle='modal'
                data-target={'#' + props.item._id}
                className='field-btn edit-btn box square'
              >
                <div className='content'>
                  <i class='fa fa-pencil' aria-hidden='true' />
                </div>
              </button>
              <button
                className='field-btn delete-btn box square'
                onClick={() => {
                  handleShow();
                }}
              >
                <div className='content'>
                  <i class='fa fa-trash' aria-hidden='true' />
                </div>
              </button>
            </div>
          ) : (
            <div className='col-1'>
              <button
                className='field-btn delete-btn box square'
                onClick={() => {
                  dispatch(borradoFisicoChofer(props.item._id));
                }}
              >
                <div className='content'>
                  <i class='fa fa-times' aria-hidden='true'></i>
                </div>
              </button>
              <button
                className='field-btn bg-success
            box square'
                onClick={() => {
                  dispatch(darDeAltaChofer(props.item._id, props.item));
                }}
              >
                <div className='content'>
                  <i class='fa fa-arrow-up' aria-hidden='true'></i>
                </div>
              </button>
            </div>
          )}
        </Card.Header>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>DNI:</label>
                <h6 className='field-display'>{props.item?.dni}</h6>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Telefono:</label>
                <h6 className='field-display'>{props.item?.telefono}</h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-6 field-admin'>
                <label className='field-label'>Nacimiento:</label>
                <h6 className='field-display'>
                  {dateFormat(props.item?.fechaNacimiento)}
                </h6>
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <div
        className='modal fade'
        id={props.item._id}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='modalChofer'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalChofer'>
                Editar chofer: {props.item?.nombre} {props.item?.apellido}
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
                  <label htmlFor='nombre'>Nuevo, nombre</label>
                  <input
                    required
                    value={nombre}
                    type='text'
                    className='form-control'
                    id='nombre'
                    aria-describedby='Nombre'
                    onChange={handleChangeNombre}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='apellido'>Nuevo, apellido</label>
                  <input
                    type='text'
                    value={apellido}
                    className='form-control'
                    id='apellido'
                    aria-describedby='Apellido'
                    required
                    onChange={handleChangeApellido}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='mail'>Nuevo, mail</label>
                  <input
                    type='email'
                    value={mail}
                    className='form-control'
                    id='mail'
                    aria-describedby='Mail'
                    required
                    onChange={handleChangeMail}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='DNI'>Nuevo, DNI</label>
                  <input
                    type='text'
                    className='form-control'
                    value={DNI}
                    id='DNI'
                    aria-describedby='DNI'
                    required
                    onChange={handleChangeDNI}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='telefono'>Nuevo, telefono</label>
                  <input
                    type='text'
                    className='form-control'
                    value={telefono}
                    id='telefono'
                    aria-describedby='Telefono'
                    required
                    onChange={handleChangeTelefono}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='fecha'>Nuevo, fecha de nacimiento</label>
                  <input
                    type='date'
                    className='form-control'
                    id='fecha'
                    aria-describedby='Fecha'
                    required
                    onChange={handleChangeFecha}
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{ backgroundColor: '#145572' }}
                >
                  Guardar chofer editado.
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminacion</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>¿Estas seguro que desea dar de baja este chofer?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => handleClose()}>
              Cerrar
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                dispatch(borrarChofer(props.item._id));
                handleClose();
              }}
            >
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Accordion>
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

export default Chofer;
