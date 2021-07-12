import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BuscarForm from './elementos/buscar';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../../footer';
import Featured from './elementos/promocionados';
import {obtenerReviews} from '../../../Redux/combixDucks'

const { dateFormatPretty } = require('../../../scripts/dateFormat');

const BuscarPasajes = () => {
  const sesion = useSelector((state) => state.combix.sesion);
  const reviews = useSelector((state) => state.combix.reviews);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerReviews());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className='bg-image-pasaje'>
        <Container>
          <div>
            <Row>
              <Col>
                <div style={{ position: 'relative', top: '20%' }}>
                  <h1
                    className={'text-center text-white  pb-5'}
                    style={{ fontSize: '64px' }}
                  >
                    Viajá CombiX
                  </h1>
                </div>
                <div style={{ position: 'relative', top: '40%' }}>
                  <BuscarForm></BuscarForm>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      {/* <Container>
        <h2 style={{ marginTop: '235px' }}>Nuestros Favoritos</h2>
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
      </Container> */}
      <Container>
        {sesion.permissions === '6094d56377b5714b3473dbc5' && (
          <Card style={{ marginTop: '250px' }}>
            <div className='p-3 gradient-gold'>
              <Card.Body>
                <Row>
                  <Col lg={7}>
                    <h2>Hacete usuario GOLD!</h2>
                    <h4 className='mt-4'>Viajá cómodo, seguro y ahorrando</h4>
                    <h4>Enterate de todos los beneficios.</h4>
                  </Col>
                  <Col>
                    <Link to='/client/miPerfil/GOLD'>
                      <button
                        className={'btn btn-login '}
                        style={{ marginTop: '30px' }}
                      >
                        <h2>Quiero ser GOLD!</h2>
                      </button>
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </div>
          </Card>
        )}

        <div className='mt-5'>
          <h2>Lo que dicen nuestros usuarios...</h2>
          <Row>
            <Col>
              {reviews.length > 0 && reviews.map((e) => 
                <Card className='db-element db-element-header' style={{paddingLeft: '35px'}}>
                  <Row>
                    <Col>
                      <Row>
                        <h4>Lo que dijo... {e.usuario.nombre}</h4>
                      </Row>
                      <Row>
                        <h6>{dateFormatPretty(e.fecha)}</h6>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    {e.contenido}
                  </Row>
                </Card>
              )}
              <Link to='/client/miPerfil/misReviews'>
                <button
                  className={'btn btn-login '}
                  style={{ marginTop: '20px', width: '100%' }}
                >
                  <h2>Escribir un Review</h2>
                </button>
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default BuscarPasajes;
