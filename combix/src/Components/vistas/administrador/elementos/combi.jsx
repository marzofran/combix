import React, {useState} from 'react';
import {Accordion, Card, Modal, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {editarCombi, borrarCombi} from '../../../../Redux/Admin/combisDucks';

//Implementado
const Combi = (props) => {
  const dispatch = useDispatch();

  const [patente, setPatente] = useState(props.item.patente);
  const [modelo, setModelo] = useState(props.item.modelo);
  const [asientos, setAsientos] = useState(props.item.cantidadAsientos);
  const [tipo, setTipo] = useState(props.item.tipo);
  const [chofer, setChofer] = useState(props.item.chofer);

  //Handlers del  modal de elimar
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangePatente = (e) => {
    setPatente(e.target.value);
  };
  const handleChangeModelo = (e) => {
    setModelo(e.target.value);
  };
  const handleChangeAsientos = (e) => {
    setAsientos(e.target.value);
  };
  const handleChangeTipo = (e) => {
    setTipo(e.target.value);
  };
  const handleChangeChofer = (e) => {
    let obj = JSON.parse(e.target.value);
    setChofer(obj);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editarCombi(patente, modelo, asientos, tipo, chofer, props.item._id)
    );
  };

  var choferes = useSelector((store) => store.choferes.elementos);

  choferes.forEach(function (chofer, index, object) {
    if (chofer.unavailable === true) {
      object.splice(index, 1);
    }
  });

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
                <label className='field-label'>Patente:</label>
                <h6 className='field-display'>{props.item.patente}</h6>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Modelo:</label>
                <h6 className='field-display'>{props.item.modelo}</h6>
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
                onClick={() => {}}
              >
                <div className='content'>
                  <i class='fa fa-times' aria-hidden='true'></i>
                </div>
              </button>
              <button
                className='field-btn bg-success
        box square'
                onClick={() => {}}
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
                <label className='field-label'># asientos:</label>
                <h6 className='field-display'>{props.item.cantidadAsientos}</h6>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Tipo:</label>
                <h6 className='field-display'>{props.item.tipo}</h6>
              </div>
            </div>
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Chofer:</label>
                <h6 className='field-display'>
                  {props.item?.chofer.nombre} {props.item?.chofer.apellido} (
                  {props.item?.chofer.mail})
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
        aria-labelledby='modalCombis'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalCombis'>
                Editar combi: {props.item.patente}
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
                  <label htmlFor='patente'>Patente:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='patente'
                    value={patente}
                    aria-describedby='Patente'
                    placeholder='Seleccione la patente'
                    required
                    onChange={handleChangePatente}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='modelo'>Modelo:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='modelo'
                    value={modelo}
                    aria-describedby='Modelo'
                    placeholder='Seleccione el modelo'
                    required
                    onChange={handleChangeModelo}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='asientos'>Cantidad de asientos:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='asientos'
                    value={asientos}
                    aria-describedby='Asientos'
                    placeholder='Seleccione la cantidad'
                    required
                    onChange={handleChangeAsientos}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='tipo'>Tipo:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='tipo'
                    value={tipo}
                    aria-describedby='Tipo'
                    placeholder='Seleccione el tipo'
                    required
                    onChange={handleChangeTipo}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='chofer'>Chofer:</label>
                  <select
                    onChange={handleChangeChofer}
                    id='chofer'
                    required
                    class='form-control'
                  >
                    {choferes.map((item) =>
                      item.apellido === chofer.apellido &&
                      item.nombre === chofer.nombre ? (
                        <option value={JSON.stringify(item)} selected>
                          {item.apellido}, {item.nombre}
                        </option>
                      ) : (
                        <option value={JSON.stringify(item)}>
                          {item?.apellido}, {item?.nombre}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{backgroundColor: '#145572'}}
                >
                  Guardar combi editada
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
            <p>¿Estas seguro que desea dar de baja esta combi?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => handleClose()}>
              Cerrar
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                dispatch(borrarCombi(props.item._id));
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

export default Combi;
