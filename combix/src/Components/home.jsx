import React from 'react';
import Register from './register';
import Footer from './footer';
import {Row, Container, Col, Image, Button, Card} from 'react-bootstrap';
import goldUser from '../resources/goldUser.jpeg';
import covidSecurity from '../resources/covidSecurity.jpg';
import combi19Logo from '../resources/Combi-19Logo.png';

const Home = () => {
  return (
    <div>
      <div className='imageLanding' id={'top'}>
        <div className='landing-control'>
          <Container>
            <Row>
              <Col>
                <h3 style={{fontFamily: 'Roboto Slab'}}>
                  Viajá seguro.
                  <br /> Viajá CombiX.
                </h3>
              </Col>
              <Col>
                <Register></Register>
              </Col>
            </Row>
          </Container>
          <a href='#mid'>
            <p style={{fontSize: '100px', textAlign: 'center', color: 'white'}}>
              <i className='fa fa-sort-desc' aria-hidden='true'></i>
            </p>
          </a>
        </div>
      </div>
      <div className={'sectionLanding'} id='mid'>
        <Container>
          <Row>
            <Col>
              <div className='absolute'>
                <Image src={covidSecurity} alt='Placeholder' fluid></Image>
              </div>
            </Col>
            <Col xl={6}>
              <div style={{padding: '20px'}}>
                <h2>Viajá seguro</h2>
                <h4>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Rerum, enim. Reprehenderit ut quod deleniti, natus beatae
                  officiis possimus deserunt vel in, nesciunt tempora amet unde
                  optio odio, tempore sapiente blanditiis!
                </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={'sectionLandingAbajo'}>
        <Container>
          <Row>
            <Col xl={6}>
              <div style={{padding: '20px'}}>
                <h2>Viajá cómodo con GOLD</h2>
                <h4>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Rerum, enim. Reprehenderit ut quod deleniti, natus beatae
                  officiis possimus deserunt vel in, nesciunt tempora amet unde
                  optio odio, tempore sapiente blanditiis!
                </h4>
              </div>
            </Col>
            <Col>
              <div className='absolute'>
                <Image src={goldUser} alt='Placeholder' fluid></Image>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{textAlign: 'center'}} className={'sectionCombix'}>
        <Container>
          <h2>Viajá Combix</h2>
          <Button
            variant='light'
            style={{
              paddingLeft: '40px',
              paddingRight: '40px',
              fontSize: '24px',
              marginTop: '10px',
            }}
          >
            <a href='#top' style={{color: '#7099a9'}}>
              Registrate
            </a>
          </Button>
        </Container>
      </div>
      <div className={'ultimaseccion imageLanding2'} id={'bottom'}>
        <Container>
          <Card
            style={{padding: '30px', marginTop: '100px', marginBottom: '100px'}}
          >
            <Card.Body>
              <Row>
                <Col>
                  <Image src={combi19Logo} fluid style={{width: '80%'}}></Image>
                </Col>
                <Col xl={8}>
                  <Card.Title>
                    <h1>Combi-19</h1>
                  </Card.Title>
                  <div className={'card-text'}>
                    <h3 style={{marginTop: '20px'}}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ad tempore dolorum unde quia explicabo soluta molestiae
                      exercitationem inventore vitae, quod labore esse numquam
                      architecto, praesentium neque! Consequatur quisquam ipsum
                      illum.
                    </h3>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
