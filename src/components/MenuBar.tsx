import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


function MenuBar(props: any) {

    return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse >
          <Nav className="me-auto">
            <Nav.Link href="/categories">Categorias</Nav.Link>
            <Nav.Link href="/products">Produtos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default MenuBar
