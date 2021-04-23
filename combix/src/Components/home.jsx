import React from 'react';
import Register from './register';
import {Row, Container, Col} from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <div className='imageLanding'>
        <div className='landing-control'>
          <Container>
            <Row>
              <Col>
                <h3>
                  Viajá seguro
                  <br /> Viajá combix.
                </h3>
              </Col>
              <Col>
                <Register></Register>
              </Col>
            </Row>
          </Container>
          <p style={{fontSize: '100px', textAlign: 'center', color: 'white'}}>
            <i class='fa fa-sort-desc' aria-hidden='true'></i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
