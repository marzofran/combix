import React from 'react';
import {useSelector} from 'react-redux';
import {Router, Switch, Route, Link} from 'react-router-dom';
import history from '../../history';
import MisReviews from './misReviews';
import MisPasajes from './misPasajes';
import Gold from './gold';
import MisDatos from './misDatos';

const {toTitleCase} = require('../../../scripts/toTitleCase')

const MiPerfil = () => {
  const user = useSelector((store) => store.combix.sesion);
  return (
    <div className='container'>
      <h2 style={{color: 'white', fontSize: '40px'}} className={'pt-3 pb-3'}>Bienvenido, {toTitleCase(user.nombre)}</h2>
      <div className={'row'}>
        <Router history={history}>
          <div className={'col-2'}>
            <ul className='list-group navegacion-admin'>
              <li className='list-group-item navegacion-admin-list'>
                <Link to='/client/miPerfil/misDatos'>Mis Datos</Link>
              </li>
              <li className='list-group-item navegacion-admin-list'>
                <Link to='/client/miPerfil/misPasajes'>Mis Pasajes</Link>
              </li>
              <li className='list-group-item navegacion-admin-list'>
                <Link to='/client/miPerfil/GOLD'><b>GOLD</b></Link>
              </li>
              <li className='list-group-item navegacion-admin-list'>
                <Link to='/client/miPerfil/misReviews'>Mis Reviews</Link>
              </li>
            </ul>
          </div>
        <Switch>
          <Route path='/client/miPerfil/misReviews'>
            <MisReviews></MisReviews>
          </Route>
          <Route path='/client/miPerfil/misPasajes'>
            <MisPasajes></MisPasajes>
          </Route>
          <Route path='/client/miPerfil/GOLD'>
            <Gold></Gold>
          </Route>
          <Route path='/client/miPerfil/misDatos'>
            <MisDatos></MisDatos>
          </Route>
        </Switch>
      </Router>
      </div>
    </div>
  );
};

export default MiPerfil;