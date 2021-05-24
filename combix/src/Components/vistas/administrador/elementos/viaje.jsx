import React, {useState, useEffect} from 'react';
import {Accordion, Card, Modal, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {borrarViaje, editarViaje} from '../../../../Redux/Admin/viajesDucks';
import dateFormat from '../../../../scripts/dateFormat';

//Implementado, faltan cruds
const Viaje = (props) => {
  const dispatch = useDispatch();
  const fechaViaje = Date.parse(props.item.fecha);
  const [ruta, setRuta] = useState(props.item.ruta);
  const [fecha, setFecha] = useState(props.item.fecha);
  const [precio, setPrecio] = useState(props.item.precio);

  //Handlers del  modal de elimar
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeRuta = (e) => {
    let obj = JSON.parse(e.target.value);
    setRuta(obj);
  };
  const handleChangeFecha = (e) => {
    setFecha(e.target.value);
  };
  const handleChangePrecio = (e) => {
    let obj = JSON.parse(e.target.value);
    setPrecio(obj);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editarViaje(ruta, fecha, precio, props.item._id));
  };

  const rutas = useSelector((store) => store.rutas.elementos);

  return (
    <Accordion className='row db-element'>
      <Card className='col'>
        <Card.Header className='db-element-header row'>
          <Accordion.Toggle
            className='db-element-header col-11'
            as={Card.Body}
            eventKey='0'
          >
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Ruta:</label>
                <h6 className='field-display'>
                  {props.item?.ruta.origen?.lugar},{' '}
                  {props.item?.ruta.origen?.provincia} {' -> '}
                  {props.item?.ruta.destino?.lugar},{' '}
                  {props.item?.ruta.destino?.provincia}
                </h6>
              </div>
            </div>
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Fecha:</label>
                <h6 className='field-display'>
                  {dateFormat(fechaViaje, 'dd/mm/yyyy')}
                </h6>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Horario:</label>
                <h6 className='field-display'>{props.item.ruta.horario}</h6>
              </div>
            </div>
          </Accordion.Toggle>
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
        </Card.Header>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Precio:</label>
                <h6 className='field-display'>${props.item.precio}</h6>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Combi:</label>
                <h6 className='field-display'>
                  {props.item.ruta.combi?.modelo}(
                  {props.item.ruta.combi?.patente})
                </h6>
              </div>
            </div>
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Chofer:</label>
                <h6 className='field-display'>
                  {props.item.ruta.combi?.chofer?.nombre}{' '}
                  {props.item.ruta.combi?.chofer?.apellido} (
                  {props.item.ruta.combi?.chofer?.mail})
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
        aria-labelledby='modalViaje'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalViaje'>
                Editar viaje: {props.item.ruta?.origen?.lugar} {' -> '}
                {props.item.ruta?.destino?.lugar},{' '}
                {dateFormat(props.item.fecha, 'dd/mm/yyyy')}
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
                  <label htmlFor='ruta'>Ruta:</label>

                  <select
                    onChange={handleChangeRuta}
                    id='ruta'
                    required
                    class='form-control'
                  >
                    {rutas.map((item, index) =>
                      item.ruta === ruta ? (
                        <option value={JSON.stringify(item)} selected>
                          {item.origen.lugar}, {item.origen.provincia} {' -> '}
                          {item.destino.lugar}, ({item.destino.provincia}
                        </option>
                      ) : (
                        <option value={JSON.stringify(item)}>
                          {item.origen.lugar}, {item.origen.provincia} {' -> '}
                          {item.destino.lugar}, {item.destino.provincia}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor='fecha'>Fecha:</label>
                  <input
                    type='date'
                    className='form-control'
                    id='fecha'
                    value={fecha}
                    aria-describedby='Fecha'
                    placeholder='Seleccione la fecha'
                    required
                    onChange={handleChangeFecha}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='precio'>Precio:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='precio'
                    value={precio}
                    aria-describedby='Precio'
                    placeholder='Seleccione el precio'
                    required
                    onChange={handleChangePrecio}
                  />
                </div>

                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{backgroundColor: '#145572'}}
                >
                  Guardar viaje editado
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
            <p>¿Estas seguro que desea eliminar este viaje?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => handleClose()}>
              Cerrar
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                dispatch(borrarViaje(props.item._id));
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

export default Viaje;
