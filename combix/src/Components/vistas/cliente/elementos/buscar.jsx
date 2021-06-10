import React, {useState} from 'react';
//import history from '../../../history';
import {buscarViajes} from '../../../../Redux/clienteDucks';
import {useDispatch} from 'react-redux';
import {Form, Row, Col, Card} from 'react-bootstrap';

const BuscarForm = () => {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');
  const [tipo, setTipo] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(buscarViajes(fecha, origen, destino));
  };
  const handleChangeOrgien = (e) => {
    setOrigen(e.target.value);
  };

  const handleChangeDestino = (e) => {
    setDestino(e.target.value);
  };

  const handleChangeFecha = (e) => {
    setFecha(e.target.value);
  };
  const handleChangeTipo = (e) => {
    setTipo(e.target.value);
  };
  return (
    <div>
      <Card>
        <div class='p-2 sombra-buscar'>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>
                      <h4>Origen</h4>
                    </Form.Label>
                    <Form.Control
                      required
                      placeholder='Ingrese el origen'
                      onChange={handleChangeOrgien}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      <h4>Fecha</h4>
                    </Form.Label>
                    <Form.Control
                      required
                      placeholder='Fecha'
                      type='date'
                      onChange={handleChangeFecha}
                    />
                  </Form.Group>
                </Col>
                <Col lg='1'>
                  <h1 className='text-center'>
                    <i
                      className='fa fa-arrow-right mt-3'
                      aria-hidden='true'
                    ></i>
                  </h1>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>
                      <h4>Destino</h4>
                    </Form.Label>
                    <Form.Control
                      required
                      placeholder='Ingrese el destino'
                      onChange={handleChangeDestino}
                    />
                  </Form.Group>
                  <Form.Label>
                    <h4>Categoría</h4>
                  </Form.Label>
                  <Form.Group onChange={handleChangeTipo}>
                    <h4 style={{display: 'inline'}}>
                      Cómodo{' '}
                      <Form.Check
                        value='comodo'
                        inline
                        name='group1'
                        type='radio'
                        label=' '
                      ></Form.Check>
                    </h4>
                    <h4 className='ml-5' style={{display: 'inline'}}>
                      Super-Cómodo{' '}
                      <Form.Check
                        value='super-comodo'
                        inline
                        name='group1'
                        type='radio'
                        label=' '
                      />
                    </h4>
                  </Form.Group>
                </Col>
              </Row>

              <button className={'btn btn-login mt-4'}>
                Buscar <i class='fa fa-search' aria-hidden='true'></i>
              </button>
            </Form>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default BuscarForm;
