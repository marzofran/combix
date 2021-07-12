import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
const { dateFormat } = require('../../../../scripts/dateFormat');

//Implementado
const Usuario = (props) => {

  let clasesCss = 'db-element-header ';

  if (Date.parse(props.item.baneado) > Date.now()) {
    clasesCss = 'db-element-header-variant ';
  }

  return (
    <Accordion className='row db-element'>
      <Card className='col'>
        <Card.Header className={clasesCss + 'row'}>
          <Accordion.Toggle
            className={clasesCss + 'col'}
            as={Card.Body}
            eventKey='0'
          >
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Nombre:</label>
                <h6 className='field-display'>
                  {props.item.nombre} {props.item.apellido}
                </h6>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Mail:</label>
                <h6 className='field-display'>{props.item.mail}</h6>
              </div>
            </div>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>DNI:</label>
                <h6 className='field-display'>{props.item.dni}</h6>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Plan:</label>
                <h6 className='field-display'>
                  {props.item.permissions === '6094d56377b5714b3473dbc5' ? (
                    <h6>No Gold</h6>
                  ) : (
                    <h6>GOLD</h6>
                  )}
                </h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-6 field-admin'>
                <label className='field-label'>Nacimiento:</label>
                <h6 className='field-display'>
                  {dateFormat(props.item.fechaNacimiento)}
                </h6>
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Usuario;
