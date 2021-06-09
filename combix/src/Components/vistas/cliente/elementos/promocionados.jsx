import React from 'react';
import {Card} from 'react-bootstrap';
const Promotions = () => {
  return (
    <div>
      <Card>
        <div class='p-2 sombra-buscar gradient-featured'>
          <Card.Body>
            <div className='text-center'>
              <h3>Promotion</h3>
              <i class='fa fa-arrow-down' aria-hidden='true'></i>
              <h3>Promotion</h3>

              <h3>22:30</h3>
            </div>
          </Card.Body>
          <hr />
          <Card.Body>
            <h5>Proximo: Promotion</h5>
            <button className={'btn btn-login mt-4'}>Seleccionar</button>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default Promotions;
