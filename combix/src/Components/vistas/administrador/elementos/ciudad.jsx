import React, {useState} from 'react';
import {Accordion, Card} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {
  borrarCiudad,
  editarCiudad,
} from '../../../../Redux/Admin/ciudadesDucks';

//Implementado
const Ciudad = (props) => {
  const dispatch = useDispatch();
  const [provincia, setProvincia] = useState(props.item.provincia);
  const [lugar, setLugar] = useState(props.item.lugar);

  const handleChangeLugar = (e) => {
    setLugar(e.target.value);
  };
  const handleChangeProvincia = (e) => {
    setProvincia(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editarCiudad(lugar, provincia, props.item._id));
    props.estado();
  };
  return (
    <Accordion className='row db-element'>
      <Card className='col'>
        <Card.Header className='db-element-header row'>
          <Accordion.Toggle
            className='db-element-header col-11'
            as={Card.Body}
            eventKey='1'
          >
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Lugar:</label>
                <h6 className='field-display'>{props.item.lugar}</h6>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Provincia:</label>
                <h6 className='field-display'>{props.item.provincia}</h6>
              </div>
            </div>
          </Accordion.Toggle>
          <div className='col-1'>
            <button
              data-toggle='modal'
              data-target={'#' + props.item.lugar}
              className='field-btn edit-btn box square'
            >
              <div className='content'>
                <i class='fa fa-pencil' aria-hidden='true' />
              </div>
            </button>
            <button
              className='field-btn delete-btn box square'
              onClick={() => {
                dispatch(borrarCiudad(props.item._id));
                props.estado();
              }}
            >
              <div className='content'>
                <i class='fa fa-trash' aria-hidden='true' />
              </div>
            </button>
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>I have no body</Card.Body>
        </Accordion.Collapse>
      </Card>
      <div
        className='modal fade'
        id={props.item.lugar}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='modalCiudad'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalCiudad'>
                Editar ciudad: {props.item.lugar}, {props.item.provincia}
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
                  <label htmlFor='lugar'>Nueva, provincia</label>
                  <input
                    required
                    type='text'
                    className='form-control'
                    id='lugar'
                    aria-describedby='Lugar'
                    value={provincia}
                    onChange={handleChangeProvincia}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='lugar'>Nuevo, Lugar de la ciudad</label>
                  <input
                    type='text'
                    className='form-control'
                    id='lugar'
                    aria-describedby='Lugar'
                    required
                    value={lugar}
                    onChange={handleChangeLugar}
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{backgroundColor: '#145572'}}
                >
                  Guardar ciudad editada.
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
    </Accordion>
  );
};

export default Ciudad;
