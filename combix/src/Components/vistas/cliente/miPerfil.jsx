import React from 'react';
import {useSelector} from 'react-redux';
import {Router, Switch, Route, Link} from 'react-router-dom';
import history from '../../history';
import MisReviews from './MisReviews';
import MisPasajes from './misPasajes';
const MiPerfil = () => {
  const user = useSelector((store) => store.combix.sesion);
  return (
    <div>
      <h2>Bienvenido,Perfil de usuario</h2>
      <Link to='/client/miPerfil/misReviews'> Reviews</Link>
      <Link to='/client/miPerfil/misPasajes'> Pasajes</Link>
      <Router history={history}>
        <Switch>
          <Route path='/client/miPerfil/misReviews'>
            <MisReviews></MisReviews>
          </Route>
          <Route path='/client/miPerfil/misPasajes'>
            <MisPasajes></MisPasajes>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default MiPerfil;
