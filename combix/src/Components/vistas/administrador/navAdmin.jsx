import React from 'react';
import {Router, Switch, Route, Link} from 'react-router-dom';
import ChoferesAdmin from './choferesAdmin';
import InsumosAdmin from './insumosAdmin';
import CombisAdmin from './combisAdmin';
import CiudadesAdmin from './ciudadesAdmin';
import RutasAdmin from './rutasAdmin';
import ViajesAdmin from './viajesAdmin';
import history from '../../history';
const NavAdmin = () => {
  return (
    <div className='container mt-3'>
      <div className={'row'}>
        <Router history={history}>
          <div className={'col-2'}>
            <ul className='list-group'>
              <li className='list-group-item'>
                <Link to='/admin/ciudades'>Ciudades</Link>
              </li>
              <li className='list-group-item'>
                <Link to='/admin/choferes'>Choferes</Link>
              </li>
              <li className='list-group-item'>
                <Link to='/admin/combis'>Combis</Link>
              </li>
              <li className='list-group-item'>
                <Link to='/admin/insumos'>Insumos</Link>
              </li>
              <li className='list-group-item'>
                <Link to='/admin/rutas'>Rutas</Link>
              </li>
              <li className='list-group-item'>
                <Link to='/admin/viajes'>Viajes</Link>
              </li>
            </ul>
          </div>
          <Switch>
            <Route path='/admin/choferes'>
              <ChoferesAdmin></ChoferesAdmin>
            </Route>
            <Route path='/admin/rutas'>
              <RutasAdmin></RutasAdmin>
            </Route>
            <Route path='/admin/viajes'>
              <ViajesAdmin></ViajesAdmin>
            </Route>
            <Route path='/admin/ciudades'>
              <CiudadesAdmin></CiudadesAdmin>
            </Route>
            <Route path='/admin/combis'>
              <CombisAdmin></CombisAdmin>
            </Route>
            <Route path='/admin/insumos'>
              <InsumosAdmin></InsumosAdmin>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default NavAdmin;
