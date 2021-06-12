import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {
  Form,
  Card,
  Row,
  Col,
  Container,
  Modal,
  Button,
  FormLabel,
} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import dateFormat from '../../../scripts/dateFormat';
import {cargarInsumos} from '../../../Redux/Admin/insumosDucks';
import FormComprar from './elementos/formComprar';
import Footer from '../../footer';

const ComprarComponent = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = location.state.viaje;
  const [iconEstilo, setIconEstilo] = useState('');
  const [cant, setCant] = useState(1);
  const [insumos, addInsumos] = useState([]);
  const [show, setShow] = useState(false);
  const insumosPropios = useSelector((store) => store.insumos.elementos);

  const [precioPasaje, setPrecioPasaje] = useState(false);
  const usuario = useSelector((store) => store.combix.sesion);
  const [prectioTotalInsumos, setPrectioTotalInsumos] = useState(0);

  const [colorPrecio, setColorPrecio] = useState('');
  const [colorPrecioGold, setColorPrecioGold] = useState('');
  useEffect(() => {
    if (usuario.permissions === '60c4c2a93690f72eb018de17') {
      setPrecioPasaje(data.precio - data.precio / 10);
      setColorPrecio('mb-1 text-secondary');
      setColorPrecioGold('mb-1 text-dark');
    } else {
      setPrecioPasaje(data.precio);
      setColorPrecio('mb-1 text-dark');
      setColorPrecioGold(' mb-1 text-secondary');
    }
    if (data.ruta.combi.tipo === 'super-comodo') {
      setIconEstilo('fa fa-star mr-2');
    } else {
      setIconEstilo('fa fa-star-half-o mr-2');
    }
    dispatch(cargarInsumos());
  }, []);
  const handleChangeCant = (e) => {
    setCant(e.target.value);
    if (e.target.value > data.ruta.combi.cantidadAsientos) {
      setCant(data.ruta.combi.cantidadAsientos);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAgregarInsumo = (e) => {
    addInsumos([...insumos, e]);
    calcularPrecioTotalInsumo(e);
  };
  const handleBorrarInsumo = (e) => {
    let newArray = [...insumos];
    let found = insumos.findIndex((item) => item._id === e._id);
    if (found !== -1) {
      newArray.splice(found, 1);
      addInsumos(newArray);
      restarPrecioInsumo(e);
    }
    console.log(found);
  };

  function calcularPrecioTotalInsumo(e) {
    setPrectioTotalInsumos(prectioTotalInsumos + e.precio);
  }
  function restarPrecioInsumo(e) {
    setPrectioTotalInsumos(prectioTotalInsumos - e.precio);
  }
  return (
    <div className='mt-3'>
      <Container>
        <Link to='./buscarPasajes'>
          <h4 className={'mt-5 mb-5 text-dark'}>
            <i class='fa fa-arrow-left mr-3' aria-hidden='true'></i>
            Volver
          </h4>
        </Link>
        <Row>
          <Col lg={8}>
            <Card className='mb-3'>
              <div className='sombra-buscar'>
                <Container>
                  <Card.Body>
                    <h4>Detalle de la compra</h4>
                    <Row>
                      <Col lg={6}>
                        <div>
                          Origen
                          <h5>
                            {data.ruta.origen.lugar},{' '}
                            {data.ruta.origen.provincia}
                          </h5>
                        </div>
                        <div>
                          Salida
                          <h5>
                            {dateFormat(data.fecha, 'dddd, mmmm d, yyyy')} -{' '}
                            {data.ruta.horario}
                          </h5>
                        </div>
                      </Col>
                      <Col lg={2}>
                        <p className='fs-1' style={{fontSize: '26px'}}>
                          <i class='fa fa-arrow-right ' aria-hidden='true'></i>
                        </p>
                      </Col>
                      <Col lg={4}>
                        Destino
                        <h5>
                          {data.ruta.destino.lugar},{' '}
                          {data.ruta.destino.provincia}
                        </h5>
                        <h5>
                          <i class={iconEstilo} aria-hidden='true'></i>
                          {data.ruta.combi.tipo}
                        </h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={5}>
                        <h5 className='mt-3'>Cantidad de asientos:</h5>
                      </Col>
                      <Col className={'mt-3'}>
                        <div style={{width: '20%'}}>
                          <Form.Control
                            type='number'
                            value={cant}
                            min={1}
                            max={data.ruta.combi.cantidadAsientos}
                            onChange={handleChangeCant}
                          ></Form.Control>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Container>
              </div>
            </Card>
            <FormComprar
              total={precioPasaje * cant + prectioTotalInsumos}
              viaje={data}
              cantAsientos={cant}
              user={usuario}
              insumos={insumos}
            ></FormComprar>
          </Col>
          <Col>
            <Card>
              <div className='sombra-buscar'>
                <Card.Body>
                  <div style={{borderBottom: '1px solid black'}}>
                    <Row>
                      <Col lg={9}>
                        {' '}
                        <p className={colorPrecio}>Precio por pasaje:</p>{' '}
                      </Col>
                      <Col>{data.precio}</Col>
                    </Row>
                    <Row>
                      <Col lg={9}>
                        <p className={colorPrecioGold}>
                          Precio GOLD por pasaje:{' '}
                        </p>
                      </Col>
                      <Col>{data.precio - data.precio / 10}</Col>
                    </Row>
                    <Row>
                      <Col lg={9}>
                        {' '}
                        <p className='mb-1'>Numero de Asientos: </p>
                      </Col>
                      <Col>{cant}</Col>
                    </Row>
                    <Row>
                      <Col lg={9}>
                        {' '}
                        <p className='mb-1'>Precio por insumos: </p>
                      </Col>
                      <Col>{prectioTotalInsumos}</Col>
                    </Row>
                  </div>
                  <div className='mt-2'>
                    <Row>
                      <Col lg={8}>
                        {' '}
                        <p className='mb-0'>Total:</p>
                      </Col>
                      <Col>
                        <h4>${precioPasaje * cant + prectioTotalInsumos}</h4>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </div>
            </Card>
            <div className='sombra-buscar mt-3'>
              <Card>
                <Card.Body>
                  <h4>Insumos</h4>

                  {insumos.map((item) => (
                    <h4>{item.nombre}</h4>
                  ))}
                  <button className={'btn btn-login mt-1'} onClick={handleShow}>
                    Agregar Insumos
                  </button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Agregar Insumos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {insumosPropios.map((item, index) => (
                        <Card className='mt-2'>
                          <Card.Body>
                            <Row>
                              <Col lg={8}>
                                <h4>{item.nombre}</h4>
                              </Col>
                              <Col>
                                <Button
                                  className='mr-2'
                                  size='lg'
                                  onClick={() => {
                                    handleBorrarInsumo(item);
                                  }}
                                >
                                  -
                                </Button>
                                <Button
                                  size='lg'
                                  onClick={() => {
                                    handleAgregarInsumo(item);
                                  }}
                                >
                                  +
                                </Button>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      ))}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant='secondary' onClick={handleClose}>
                        Cerrar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <div className='mt-5'>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default ComprarComponent;
