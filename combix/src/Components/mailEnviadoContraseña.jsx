import React from 'react';
import {Container, Card} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';

const MailEnviado = (props) => {
  const location = useLocation();
  const mail = location.state.mail;
  console.log(mail);
  return (
    <div className='mt-5'>
      <Container>
        <Link to='./'>
          <h4 className={'mt-5 mb-5 text-dark'}>
            <i class='fa fa-arrow-left mr-3' aria-hidden='true'></i>
            Volver
          </h4>
        </Link>

        <Card>
          <div className='sombra-buscar'>
            <Card.Body>
              <div className='text-center '>
                <h2>Se envio un correo, al mail : {mail}</h2>
                <h4>
                  Revisa tu casilla de correo, ahi recibirás tus datos de inicio
                  de sesion
                </h4>
              </div>
            </Card.Body>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default MailEnviado;
