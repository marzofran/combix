import React from 'react';
import {Row, Col, Table} from 'react-bootstrap'

const ListaDePasajeros = (props) => {
  return (
    <Col className={'viajes-admin'}>
      <Row>
        <h5 style={{color: '#357185', padding: '5px 10px'}}><u>Pasajeros</u></h5>
      </Row>
      <Row>
        <Table striped bordered size="sm">
          <thead>
            <tr>
              <th>Disponibles</th>
              <th>nº disponibles</th>
            </tr>
          </thead>
        </Table>
      </Row>
      <Row>

      </Row>
    </Col>
  );
};

export default ListaDePasajeros;
