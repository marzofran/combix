import React, {useState} from 'react';
import {Card, Container, Form, Button} from 'react-bootstrap';
import history from './history';
import {useDispatch} from 'react-redux';
import {recuperarContraseña} from '../Redux/clienteDucks';
const OlvideContraseña = () => {
  const [mail, setMail] = useState('');
  const handleChangleMail = (e) => {
    setMail(e.target.value);
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(recuperarContraseña(mail));
  };
  return (
    <div className='mt-5'>
      <Container>
        <Card>
          <Card.Header>
            <h4>Recupera tu cuenta</h4>
          </Card.Header>

          <Form onSubmit={handleSubmit}>
            <Card.Body>
              <Form.Group>
                <Form.Label>
                  <h4> Ingresa tu correo electrónico para buscar tu cuenta.</h4>
                </Form.Label>
                <Form.Control
                  required
                  onChange={handleChangleMail}
                  type='email'
                  placeholder='Ingresa tu mail'
                ></Form.Control>
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <Button type='submit'>Recuperar Contraseña</Button>
            </Card.Footer>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default OlvideContraseña;
