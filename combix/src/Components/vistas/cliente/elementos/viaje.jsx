import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const { dateFormatPretty } = require('../../../../scripts/dateFormat');
const { toTitleCase } = require('../../../../scripts/toTitleCase');

const Viaje = (props) => {
  const sesion = useSelector((state) => state.combix.sesion);
  const [tarjetaEstilo, setTarjetaEstilo] = useState('');
  const [iconEstilo, setIconEstilo] = useState('');
  const [comprable, setComprable] = useState(true);

  const [alertaEstilo, setAlertaEstilo] = useState('');
  const [iconAlert, setIconAlert] = useState('');

  useEffect(() => {
    calcularBan();
    if (props.item.ruta.combi.tipo === 'Súper-Cómodo') {
      setTarjetaEstilo('gradient-supercomodas');
      setIconEstilo('fa fa-star mr-2');
    } else {
      setTarjetaEstilo('');
      setIconEstilo('fa fa-star-half-o mr-2');
    }

    if (props.item.disponibilidad >= 10) {
      setAlertaEstilo('bg-success rounded');
      setIconAlert('fa fa-check mr-2 ml-2');
    } else if (props.item.disponibilidad < 5) {
      setAlertaEstilo('bg-danger rounded');
      setIconAlert('fa fa-exclamation mr-2 ml-2');
    } else {
      setAlertaEstilo('bg-warning');
      setIconAlert('fa fa-clock-o mr-2 ml-2');
    }
  }, []);

  function calcularBan() {
    let fechaViaje = Date.parse(props.item.fecha);
    fechaViaje = fechaViaje / 1000 / 3600;
    let horaViaje = props.item.ruta.horario;
    horaViaje = horaViaje.split(':', 2);
    horaViaje = parseInt(horaViaje[0]) + parseFloat(horaViaje[1] / 60);
    fechaViaje = fechaViaje + horaViaje;

    let fechaBaneo = Date.parse(sesion.baneado);
    fechaBaneo = fechaBaneo / 1000 / 3600;
    if (fechaBaneo > fechaViaje) {
      setComprable(false);
    }
  }
  return (
    <div className='mb-3'>
      <Card className={tarjetaEstilo}>
        <Row>
          <Col
            style={{
              borderRight: '1px solid rgba(0,0,0,.125)',
              paddingRight: '0px',
            }}
            lg={9}
          >
            <div
              style={{
                borderBottom: '1px solid rgba(0,0,0,.125)',
                paddingLeft: '1.25rem',
              }}
            >
              <h4>
                <i class={iconEstilo} aria-hidden='true'></i>
                {props.item.ruta.combi.tipo}
              </h4>
            </div>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Text>
                    <h4>
                      {toTitleCase(props.item.ruta.origen.lugar)},{' '}
                      {toTitleCase(props.item.ruta.origen.provincia)}
                    </h4>
                    <h5>
                      Salida: {dateFormatPretty(props.item.fecha)}
                      {' - '}
                      {props.item.ruta.horario}
                    </h5>
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    <h4>
                      <i className='fa fa-arrow-right ' aria-hidden='true'></i>
                      {'  '}
                      {toTitleCase(props.item.ruta.destino.lugar)},{' '}
                      {toTitleCase(props.item.ruta.destino.provincia)}
                    </h4>
                  </Card.Text>
                </Col>
              </Row>

              <Card>
                <Card.Body
                  className={alertaEstilo}
                  style={{ padding: '0.50rem' }}
                >
                  <h6>
                    <i class={iconAlert} aria-hidden='true'></i>
                    Quedan {props.item.disponibilidad} asientos libres
                  </h6>
                </Card.Body>
              </Card>
            </Card.Body>
          </Col>

          <Col>
            <Card.Body>
              <div
                className={'mb-3'}
                style={{ borderBottom: '1px solid rgba(0,0,0,.125)' }}
              >
                <h5>Precio: ${props.item.precio}</h5>
              </div>
              <h5>
                Precio GOLD: $
                {props.item.precio - (props.item.precio / 100) * 10}
              </h5>
              {comprable ? (
                <Link
                  to={{
                    pathname: './comprar',
                    state: { viaje: props.item },
                  }}
                >
                  <button className={'btn btn-login mt-4'}>Seleccionar</button>
                </Link>
              ) : (
                <h6 className='text-danger'>
                  Estas baneado hasta el {dateFormatPretty(sesion.baneado)}
                </h6>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Viaje;
