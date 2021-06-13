import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import FormGold from './elementos/formGold'
import {cancelarGold} from '../../../Redux/combixDucks';

const Gold = () => {
  
  const dispatch = useDispatch();

  const usuario = useSelector((store) => store.combix.sesion);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col-9'>
            <h3 style={{color: '#357185', padding: '5px 10px'}}>Membresía <b>GOLD</b> </h3>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p style={{color: '#357185', padding: '5px 10px'}}>
              Con la Membresía <b>GOLD</b> tenes un beneficio de un 10% de descuento en todas tus compras, incluyendo en la compra de insumos para tus viajes. ¿Qué estas esperando? Ahorrá con <b>GOLD</b>.
              <br></br> Disfruta los beneficios de la Membresía <b>GOLD</b> por solo $475.66 final por mes
            </p>
          </div>
        </div>
        {usuario.permissions == '60c4c2a93690f72eb018de17' ? 
        (<div className='row'>
          <div className="col-8">
            <h3 style={{paddingTop: '10px', fontSize: '20px'}}>Quiero cancelar mi membresía GOLD</h3>
          </div>
          <div className='col'>
            <button
              type='button'
              className={'btn btn-primary btn-block'}
              style={{backgroundColor: '#145572'}}
              onClick={() => {
                handleShow();
              }}
            >
              Cancelar Membresía <b>GOLD</b>
            </button>
          </div>
        </div>)
        : 
        (<><div className='row'>
          <div className="col">
            <div className="row">
              <h3 style={{padding: '10px 15px', fontSize: '20px'}}>Quiero activar mi membresía GOLD</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ padding: '10px 40px'}}>
            <FormGold></FormGold>
          </div>
        </div></>)}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>¡Atención!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>No recibira ningun tipo de reintegro por la cancelación de su subscripción. ¿Está segurx que quiere continuar?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => handleClose()}>
              Cerrar
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                dispatch(cancelarGold(usuario._id));
                handleClose();
              }}
            >
              Si, quiero cancelar mi subscripcion
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Gold;
