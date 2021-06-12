import React from 'react';
import {Accordion, Card} from 'react-bootstrap';
const {dateFormat} = require('../../../../scripts/dateFormat')

//Implementado
const Usuario = (props) => {

  return (
    <Accordion className="row db-element">
      <Card className="col">
        <Card.Header className="db-element-header row">
          <Accordion.Toggle
            className="db-element-header col"
            as={Card.Body}
            eventKey="0"
          >
            <div className="row">
              <div className="col field-admin">
                <label className="field-label">Nombre:</label>
                <h6 className="field-display">
                  {props.item.nombre} {props.item.apellido}
                </h6>
              </div>
              <div className="col field-admin">
                <label className="field-label">Mail:</label>
                <h6 className="field-display">{props.item.mail}</h6>
              </div>
            </div>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <div className="row">
              <div className="col field-admin">
                <label className="field-label">DNI:</label>
                <h6 className="field-display">{props.item.dni}</h6>
              </div>
              <div className="col field-admin">
                <label className="field-label">Plan:</label>
                <h6 className="field-display">{props.item.plan}</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-6 field-admin">
                <label className="field-label">Nacimiento:</label>
                <h6 className="field-display">{dateFormat(props.item.fechaNacimiento)}</h6>
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Usuario;
