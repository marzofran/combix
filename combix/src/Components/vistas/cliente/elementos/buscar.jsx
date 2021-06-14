import React, {useState, useEffect} from 'react';
//import history from '../../../history';
import {buscarViajes} from '../../../../Redux/clienteDucks';
import {cargarCiudades} from '../../../../Redux/Admin/ciudadesDucks';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Row, Col, Card} from 'react-bootstrap';
const {toTitleCase} = require('../../../../scripts/toTitleCase');

const BuscarForm = () => {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');
  const [tipo, setTipo] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cargarCiudades());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    if (origen._id === destino._id) {
      event.preventDefault();
      alert('Origen y destino no pueden ser iguales');
    } else {
      event.preventDefault();
      console.log('sending',fecha,origen,destino,tipo)
      dispatch(buscarViajes(fecha, origen, destino, tipo));
    }
  };
  const handleChangeOrigen = (e) => {
    let obj = JSON.parse(e.target.value);
    setOrigen(obj);
  };

  const handleChangeDestino = (e) => {
    let obj = JSON.parse(e.target.value);
    setDestino(obj);
  };

  const handleChangeFecha = (e) => {
    setFecha(e.target.value);
  };
  const handleChangeTipo = (e) => {
    setTipo(e.target.value);
  };

  const ciudades = useSelector((store) => store.ciudades.elementos);

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
                    <select
                    onChange={handleChangeOrigen}
                    id='origen'
                    required
                    class='form-control'
                    >
                    <option>Seleccione un origen</option>
                    {ciudades.map((item, index) => (
                      <option value={JSON.stringify(item)}>
                        {toTitleCase(item.lugar)}, {toTitleCase(item.provincia)}
                      </option>
                    ))}
                  </select>
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
                    <select
                      onChange={handleChangeDestino}
                      id='destino'
                      required
                      class='form-control'
                    >
                      <option>Seleccione un destino</option>
                      {ciudades.map((item) => (
                        <option value={JSON.stringify(item)}>
                          {toTitleCase(item.lugar)},{' '}
                          {toTitleCase(item.provincia)}
                        </option> 
                      ))}
                    </select>
                  </Form.Group>
                  <Form.Label>
                    <h4>Categoría</h4>
                  </Form.Label>
                  <Form.Group onChange={handleChangeTipo}>
                    <h4 style={{display: 'inline'}}>
                      Cómodo{' '}
                      <Form.Check
                        value={false}
                        inline
                        checked
                        name='group1'
                        type='radio'
                        label=' '
                      ></Form.Check>
                    </h4>
                    <h4 className='ml-5' style={{display: 'inline'}}>
                      Super-Cómodo{' '}
                      <Form.Check
                        value={true}
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
