import React, {useState, useEffect} from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
const {dateFormatPretty} = require('../../../../scripts/dateFormat');

const Viaje = (props) => {
  const [tarjetaEstilo, setTarjetaEstilo] = useState('');
  const [iconEstilo, setIconEstilo] = useState('');

  const [alertaEstilo, setAlertaEstilo] = useState('');
  const [iconAlert, setIconAlert] = useState('');

  useEffect(() => {
    if (props.item.ruta.combi.tipo === 'supercomoda') {
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
                      {props.item.ruta.origen.lugar},{' '}
                      {props.item.ruta.origen.provincia}
                    </h4>
                    <h5>
                      Salida: {dateFormatPretty(props.item.fecha)} ,
                      {props.item.ruta.horario}
                    </h5>
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    <h4>
                      <i className='fa fa-arrow-right ' aria-hidden='true'></i>
                      {props.item.ruta.destino.lugar},{' '}
                      {props.item.ruta.destino.provincia}
                    </h4>
                  </Card.Text>
                </Col>
              </Row>

              <Card>
                <Card.Body
                  className={alertaEstilo}
                  style={{padding: '0.50rem'}}
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
                style={{borderBottom: '1px solid rgba(0,0,0,.125)'}}
              >
                <h5>Precio: {props.item.precio}</h5>
              </div>
              <h5>
                Precio GOLD:{' '}
                {props.item.precio - (props.item.precio / 100) * 10}
              </h5>
              <Link
                to={{
                  pathname: './comprar',
                  state: {viaje: props.item},
                }}
              >
                <button className={'btn btn-login mt-4'}>Seleccionar</button>
              </Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Viaje;
