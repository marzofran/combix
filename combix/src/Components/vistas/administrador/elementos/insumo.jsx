import React, {useState} from 'react';
import {Accordion, Card} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {borrarInsumo, editarInsumo} from '../../../../Redux/combixDucks';

const Insumo = props => {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState('nombre');
  const [tipo, setTipo] = useState('tipo');
  const [precio, setPrecio] = useState('precio');

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };
  const handleChangeTipo = (e) => {
    setTipo(e.target.value);
  };
  const handleChangePrecio = (e) => {
    setPrecio(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editarInsumo(nombre, tipo, precio, props.item._id));
    props.estado();
  };

  return (
    <Accordion className="row db-element">
      <Card className="col">
        <Card.Header className="db-element-header row">
          <Accordion.Toggle
            className="db-element-header col-11"
            as={Card.Body}
            eventKey="0"
          >
            <div className="row">
              <div className="col field-admin">
                <label className="field-label">Nombre:</label>
                <h7 className="field-display">{props.item.nombre}</h7>
              </div>
              <div className="col field-admin">
                <label className="field-label">Tipo:</label>
                <h7 className="field-display">{props.item.tipo}</h7>
              </div>
            </div>
          </Accordion.Toggle>
          <div className="col-1">
            <button
              data-toggle="modal"
              data-target={'#' + props.item.nombre}
              className="field-btn edit-btn box square"
            >
              <div className="content">
                <i class="fa fa-pencil" aria-hidden="true" />
              </div>
            </button>
            <button
              className="field-btn delete-btn box square"
              onClick={() => {
                dispatch (
                  borrarInsumo (props.item.nombre, props.item.tipo, props.item.precio)
                );
                props.estado ();
              }}
            >
              <div className="content">
                <i class="fa fa-trash" aria-hidden="true" />
              </div>
            </button>
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            
          <div className="row">
              <div className="col-6 field-admin">
                <label className="field-label">Precio:</label>
                <h7 className="field-display">{props.item.precio}</h7>
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <div
        className="modal fade"
        id={props.item.nombre}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalInsumo"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalInsumo">
                Editar insumo, {props.item.nombre}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Nuevo, Nombre</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="nombre"
                    aria-describedby="Nombre"
                    onChange={handleChangeNombre}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tipo">Nuevo, Tipo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tipo"
                    aria-describedby="Tipo"
                    required
                    onChange={handleChangeTipo}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="precio">Nuevo, Precio</label>
                  <input
                    type="text"
                    className="form-control"
                    id="precio"
                    aria-describedby="Precio"
                    required
                    onChange={handleChangePrecio}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{backgroundColor: '#145572'}}
                >
                  Guardar insumo editado.
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default Insumo;
