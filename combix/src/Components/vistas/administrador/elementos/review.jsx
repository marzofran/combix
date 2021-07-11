import React, {useState} from 'react';
import { Accordion, Card, Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { borrarReview } from '../../../../Redux/combixDucks';

const { dateFormatPretty } = require('../../../../scripts/dateFormat');

//Implementado
const Review = (props) => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                <h5 className='field-display'>
                  Lo que dijo... {props.item.usuario.nombre}
                </h5>
              </div>
              <div className='col field-admin'>
                <h5 className='field-display'>{dateFormatPretty(props.item.fecha)}</h5>
              </div>
            </div>
            <div className='row'>
                <h6 className='field-display'>{props.item.contenido}</h6>
            </div>
          </Accordion.Toggle>
          <div className='col-1'>
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
      </Card>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminacion</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>¿Está seguro que desea eliminar este review?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => handleClose()}>
              Cerrar
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                dispatch(borrarReview(props.item._id));
                handleClose();
              }}
            >
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
    </Accordion>
  );
};

export default Review;