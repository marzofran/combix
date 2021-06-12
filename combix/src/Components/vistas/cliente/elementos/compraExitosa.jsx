import React from 'react';
import {Card, Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Footer from '../../../footer';
const CompraExitosa = () => {
  return (
    <div>
      <Container>
        <Link to='./busqueda' className='text-dark'>
          <h2 className={'mt-5 mb-5'}>
            <i class='fa fa-arrow-left mr-3' aria-hidden='true'></i>
            Volver a la busqueda
          </h2>
        </Link>

        <Card className='sombra-buscar mb-2 '>
          <Card.Body>
            <Row>
              <Col className='text-center'>
                <h1 className='mt-5 mb-5'>¡Compra realizada con exito!</h1>
                <h4>
                  Se enviaron los detalles del pasaje al e-mail de su cuenta.
                </h4>
                <h4 className='mb-3'>
                  Tambien puede visualizarlos en la pestaña de Pasajes en Mi
                  Perfil.
                </h4>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <p className='text-secondary text-center mb-5 '>
          Las devoluciones son 48 horas de anticipación al viaje, posterior a
          ese tiempo no se le reembolsara su dinero
        </p>
        <Row>
          <Col>
            <Link to='./misPasajes'>
              {' '}
              <button className={'btn btn-login mt-1'}>Ver mis Pasajes</button>
            </Link>
          </Col>
          <Col>
            {' '}
            <Link to='./buscarPasajes'>
              <button className={'btn btn-login mt-1'}>Volver al inicio</button>
            </Link>
          </Col>
        </Row>
      </Container>
      <div className='mt-5'>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default CompraExitosa;
