import React from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';

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
                src='https://lh4.googleusercontent.com/I4I5REFlxos1ikYNbDOhek3xgQEg_M3cvSqz3XtOn-wRhvfQtDAFaLNA5UpDnxgR-tM7MiPZNK-rJQk38fQG=w1678-h969-rw'
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
