import React, {useState, useEffect} from 'react';
import {
  Card,
  Container,
  Accordion,
  Button,
  Row,
  Col,
  Modal,
} from 'react-bootstrap';

const Pasaje = (props) => {
  const [show, setShow] = useState(false);
  const [texto, setTexto] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var today = new Date();

  useEffect(() => {
    if (false) {
      setTexto('Se le reintegrara el 100%');
    } else {
      setTexto('Se le reintegrara el 40%');
    }
  }, []);
  return (
    <div>
      <Container>
        <Card>
          <Card.Body>
            <div>
              <Accordion defaultActiveKey='0'>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                      <Row>
                        <Col>
                          <h4>Fecha:</h4>
                        </Col>
                        <Col>
                          <h4>Hora:</h4>
                        </Col>
                      </Row>
                      <h4>
                        Precio Total: $
                        {parseFloat(props.item.precioTotal).toFixed(2)}
                      </h4>
                    </Accordion.Toggle>
                    <Button onClick={handleShow}>Rembolsar</Button>
                  </Card.Header>
                  <Accordion.Collapse eventKey='0'>
                    <Card.Body>
                      <Row>
                        <Col>
                          <h4>Origen:</h4>
                        </Col>
                        <Col>
                          <h4>Destino:</h4>
                        </Col>
                      </Row>

                      {props.item.insumos.map((item) => (
                        <p> {item.nombre}</p>
                      ))}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Esta seguro que desea pedir una devolución este pasaje?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{texto}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant='danger' onClick={handleClose}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Pasaje;
