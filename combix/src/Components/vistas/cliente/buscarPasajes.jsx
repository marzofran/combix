import React from 'react';

import BuscarForm from './elementos/buscar';
import {Row, Col, Container, Card} from 'react-bootstrap';
import Fotter from '../../footer';
import Featured from './elementos/promocionados';
const BuscarPasajes = () => {
  return (
    <div>
      <div className='bg-image-pasaje'>
        <Container>
          <div>
            <Row>
              <Col>
                <div style={{position: 'relative', top: '20%'}}>
                  <h1
                    className={'text-center text-white  pb-5'}
                    style={{fontSize: '64px'}}
                  >
                    Viajá CombiX
                  </h1>
                </div>
                <div style={{position: 'relative', top: '40%'}}>
                  <BuscarForm></BuscarForm>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container>
        <h2 style={{marginTop: '235px'}}>Nuestros Favoritos</h2>
        <Row>
          <Col>
            <Featured></Featured>
          </Col>
          <Col>
            <Featured></Featured>
          </Col>
          <Col>
            <Featured></Featured>
          </Col>
        </Row>
      </Container>
      <Container>
        <Card className='mt-5'>
          <div className='p-3 gradient-gold'>
            <Card.Body>
              <Row>
                <Col lg={7}>
                  <h2>Hacete usuario GOLD!</h2>
                  <h4 className='mt-4'>Viajá cómodo, seguro y ahorrando</h4>
                  <h4>Enterate de todos los beneficios.</h4>
                </Col>
                <Col>
                  <button
                    className={'btn btn-login '}
                    style={{marginTop: '30px'}}
                  >
                    <h2>Quiero ser GOLD!</h2>
                  </button>
                </Col>
              </Row>
            </Card.Body>
          </div>
        </Card>

        <div className='mt-5'>
          <h2>Opiniones de nuestros viajeros</h2>
          <h1 className=' text-center'>
            {' '}
            <i class='fa fa-plus' aria-hidden='true'></i>
          </h1>
        </div>
      </Container>
      <Fotter></Fotter>
    </div>
  );
};

export default BuscarPasajes;
