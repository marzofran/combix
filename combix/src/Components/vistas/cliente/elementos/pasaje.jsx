import React from 'react';
import {Card, Container} from 'react-bootstrap';

const Pasaje = (props) => {
  return (
    <Container>
      {' '}
      <Card>
        <Card.Body>
          <div>
            <h4>Precio Total: ${parseFloat(props.item.precioTotal).toFixed(2)}</h4>
            <button>Eliminar</button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Pasaje;
