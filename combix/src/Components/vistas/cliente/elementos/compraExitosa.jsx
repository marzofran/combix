import React from 'react';
import {Card, Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Footer from '../../../footer';
const CompraExitosa = () => {
  return (
    <div>
      <Container>
        <Link to='/client/buscarPasajes' className='text-dark'>
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
          En caso de cancelación, el reembolso será del 100% previo a las 48
          horas de anticipación al viaje, posterior a ese tiempo solo se le
          reembolsara un 50% del precio total del viaje. La cancelación puede
          darse de manera voluntaria en su Perfil de Usuario, o como resultado
          de las medidas de prevencion contra el COVID-19 (en este caso se le
          reembolsara el 100% de su compra)
        </p>
        <Row>
          <Col>
            <Link to='/client/miPerfil/misPasajes'>
              {' '}
              <button className={'btn btn-login mt-1'}>Ver mis Pasajes</button>
            </Link>
          </Col>
          <Col>
            {' '}
            <Link to='/client/buscarPasajes'>
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
