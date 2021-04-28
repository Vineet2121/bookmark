import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='bg-white mt-auto navbar fixed-bottom '>
      <Container>
        <Row>
          <Col className='text-center py-2'>
            Copyright &copy; Learning Solutions
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
