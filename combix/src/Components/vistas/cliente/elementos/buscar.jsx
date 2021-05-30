import React from 'react';
import {Form, Row, Col, Card} from 'react-bootstrap';
const BuscarForm = () => {
  return (
    <div>
      <Card>
        <div class='p-2 sombra-buscar'>
          <Card.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>
                      <h4>Origen</h4>
                    </Form.Label>
                    <Form.Control placeholder='Ingrese el origen' />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      <h4>Fecha</h4>
                    </Form.Label>
                    <Form.Control placeholder='Fecha' type='date' />
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
                    <Form.Control placeholder='Ingrese el destino' />
                  </Form.Group>
                  <Form.Label>
                    <h4>Categoría</h4>
                  </Form.Label>
                  <Form.Group>
                    <h4 style={{display: 'inline'}}>
                      Cómodo{' '}
                      <Form.Check
                        inline
                        name='group1'
                        type='radio'
                        label=' '
                      ></Form.Check>
                    </h4>
                    <h4 className='ml-5' style={{display: 'inline'}}>
                      Super-Cómodo{' '}
                      <Form.Check inline name='group1' type='radio' label=' ' />
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
