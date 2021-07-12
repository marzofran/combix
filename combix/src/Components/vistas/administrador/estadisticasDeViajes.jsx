import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Container, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { cargarEstadisticas } from '../../../Redux/Admin/viajesDucks';
import { useSelector } from 'react-redux';
import Estadistica from './elementos/estadistica';
const EstadisticasDeViajes = () => {
  const [fechaInicio, editarFechaInicio] = useState(Date);
  const [fechaFin, editarFechaFin] = useState(Date);
  const [viajesEncontrados, editarViajesEncontrados] = useState([]);
  const estadisticas = useSelector((state) => state.viajes.estadisticas);
  const dispatch = useDispatch();
  const handlerChangeFInicio = (e) => {
    editarFechaInicio(e.target.value);
  };
  const handlerChangeFFin = (e) => {
    editarFechaFin(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let inicio = Date.parse(fechaInicio);
    let fin = Date.parse(fechaFin);
    if (inicio < fin) {
      dispatch(cargarEstadisticas(inicio, fin));
      //editarViajesEncontrados(estadisticas);
    } else {
      alert('La fecha de inicio no puede ser mayor que la de fin');
    }
  };
  useEffect(() => {}, [estadisticas]);
  return (
    <div className={'col'}>
      <Container>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Fecha inicio</Form.Label>
                    <Form.Control
                      onChange={handlerChangeFInicio}
                      required
                      type='date'
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Fecha fin</Form.Label>
                    <Form.Control
                      onChange={handlerChangeFFin}
                      required
                      type='date'
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Button type='submit'>Buscar</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        {estadisticas.map((item) => (
          <Estadistica item={item}></Estadistica>
        ))}
      </Container>
    </div>
  );
};

export default EstadisticasDeViajes;
