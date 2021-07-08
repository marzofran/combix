import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {comprarPasajeChofer} from '../../../Redux/choferDucks';
const CheckOut = () => {
  const disponibilidad = useSelector((store) => store.chofer.disponibilidad);
  const viajeSeleccionado = useSelector((store) => store.chofer.seleccionado);
  const sesionDeCompra = useSelector((store) => store.chofer.sesionCompra);
  const [cant, setCant] = useState(1);
  const [total, setTotal] = useState(cant * viajeSeleccionado.precio);
  const dispatch = useDispatch();
  useEffect(() => {
    actualizarPrecioTotal();
  }, [actualizarPrecioTotal]);
  const handleChangeCant = (e) => {
    setCant(e.target.value);

    if (e.target.value > disponibilidad) {
      setCant(disponibilidad);
    }
    if (e.target.value < 1) {
      setCant(1);
    }
    actualizarPrecioTotal();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function actualizarPrecioTotal() {
    if (sesionDeCompra.permissions === '60c4c2a93690f72eb018de17') {
      setTotal(
        cant * viajeSeleccionado.precio - cant * viajeSeleccionado.precio * 0.1
      );
    } else {
      setTotal(cant * viajeSeleccionado.precio);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      comprarPasajeChofer(viajeSeleccionado, sesionDeCompra, cant, total)
    );
  };
  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>Cantidad de asientos y monto</Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>Cantidad de asientos</Col>
                    <Col>
                      <Form.Control
                        min={1}
                        value={cant}
                        max={disponibilidad}
                        type='number'
                        required
                        onChange={handleChangeCant}
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Precio por pasaje</Col>
                    <Col>{viajeSeleccionado.precio}</Col>
                  </Row>
                  <Row>
                    <Col>Numero de asientos</Col>
                    <Col>{cant}</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>Total</Col>
                    <Col> {cant * viajeSeleccionado.precio}</Col>
                  </Row>
                  {sesionDeCompra.permissions ===
                    '60c4c2a93690f72eb018de17' && (
                    <div>
                      <Row>
                        <Col>Descuento Gold</Col>
                        <Col>
                          -
                          {parseFloat(
                            (cant * viajeSeleccionado.precio * 0.1).toFixed(2)
                          )}
                        </Col>
                      </Row>
                    </div>
                  )}

                  <Row>
                    <Col>
                      <h4>Precio final</h4>
                    </Col>
                    <Col>
                      <h4>{total}</h4>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type='submit'>SIGUIENTE</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button>Cancelar compra</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default CheckOut;
