import React from 'react';
import {Accordion, Card} from 'react-bootstrap';

const Chofer = (props) => {
  return (
    <Accordion className="col">
        <Card>
            <Card.Header className="element-header row">
                <Accordion.Toggle className="element-header col-11" as={Card.Body} eventKey="1">
                <div className='row'>
                    <div className='col field-admin'>
                        <label className="field-label">Nombre:</label>
                        <h7 className="field-display">{props.item.nombre}</h7>
                    </div>
                    <div className='col field-admin'>
                        <label className="field-label">Tipo:</label>
                        <h7 className="field-display">{props.item.tipo}</h7>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 field-admin'>
                        <label className="field-label">Precio:</label>
                        <h7 className="field-display">{props.item.precio}</h7>
                    </div>
                </div>
                </Accordion.Toggle>
                <div className="col-1">
                    <button className="field-btn edit-btn box square"><div className="content"><i class='fa fa-pencil' aria-hidden='true'></i></div></button>
                    <button className="field-btn delete-btn box square"><div className="content"><i class='fa fa-trash' aria-hidden='true'></i></div></button>
                </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body>I have no body</Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>
  );
};
export default Chofer;