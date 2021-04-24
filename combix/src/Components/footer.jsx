import React from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';
import logo from '../resources/ramenWare.png';

const Footer = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col xl={8} style={{marginTop: '30px'}}>
            <h5>Copyright c 2021 ramenware.com. All Rights Reserved.</h5>
          </Col>
          <Col>
            <h5>
              Developed by
              <Image
                src={logo}
                fluid
                style={{width: '20%', marginLeft: '10px'}}
              ></Image>
              RamenWare
            </h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
