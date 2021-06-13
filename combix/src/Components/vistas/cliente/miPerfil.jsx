import React from 'react';
import {useSelector} from 'react-redux';
import {Router, Switch, Route, Link} from 'react-router-dom';
import history from '../../history';
import MisReviews from './MisReviews';
import MisPasajes from './misPasajes';
import Gold from './gold';

const {toTitleCase} = require('../../../scripts/toTitleCase')

const MiPerfil = () => {
  const user = useSelector((store) => store.combix.sesion);
  return (
    <div>
      <h2>Bienvenido, {toTitleCase(user.nombre)}</h2>
      <Link to='/client/miPerfil/misReviews'> Reviews</Link>
      <Link to='/client/miPerfil/misPasajes'> Pasajes</Link>
      <Link to='/client/miPerfil/GOLD'> GOLD </Link>
      <Router history={history}>
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
        </Switch>
      </Router>
    </div>
  );
};

export default MiPerfil;
