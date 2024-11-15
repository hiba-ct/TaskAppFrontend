
import React from 'react';
import Container from 'react-bootstrap/Container';

import Navbar from 'react-bootstrap/Navbar';


const Header = () => {
  return (
    
    <Navbar collapseOnSelect expand="lg" className="  flex bg-primary fixed w-full ">
      <Container>
        <Navbar.Brand className='text-danger fs-3' href="home"> Tak Management App</Navbar.Brand>
      
          
       
      </Container>
    </Navbar>
  );
};

export default Header;
