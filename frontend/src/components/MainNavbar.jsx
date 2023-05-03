import { useContext, useState } from "react";
import UserContext from "./UserContext";
import {LinkContainer} from 'react-router-bootstrap'
import axios from 'axios';

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import StoryDotsLogo from "../assets/images/storydots-logo.jpeg";

const MainNavbar = () => {
  const { isLogged, setIsLogged } = useContext(UserContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogin = (e) => {
    e.preventDefault();
    let values = {
      username : e.target.elements.username.value,
      password : e.target.elements.password.value
    }
    axios.post(`${process.env.SERVER_URI}/login`, values)
    .then((response)=> {
      if (!response.data.error) {
        localStorage.setItem("accessToken", response.data.token);
        setIsLogged(true)
        handleClose();
        window.location.reload(true)
      }
      else {
        alert(response.data.error);
      }
    })
    .catch((e)=>console.log(e))
  }

  const logout = () => {
    localStorage.removeItem("accessToken")
    setIsLogged(false)
    window.location.reload(false)
  }

  return (
    <>
    <Navbar
      collapseOnSelect
      fixed="top"
      bg="dark"
      expand="lg"
      variant="dark"
      className="p-3"
    >
      <Container>
        <Navbar.Brand href="/">
          <img src={StoryDotsLogo} width="50px" alt="logo-storydots" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto mb-lg-0 flex-row justify-content-center flex-wrap">
              <Nav.Link href="/" className="px-2 text-white">
                INICIO
              </Nav.Link>
          </Nav>
          <Nav>
            <div className="d-flex justify-content-center">
              {isLogged ? (
                <NavDropdown
                  title={
                    <svg
                      className="bi pe-none"
                      width="30"
                      height="30"
                      fill="white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                      />
                    </svg>
                  }
                  id="collasible-nav-dropdown"
                  className="me-2"
                >
                  <LinkContainer to='/create'>
                    <NavDropdown.Item>
                    Crear Producto
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logout}>
                    Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Button onClick={handleShow} variant="outline-light me-2">
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Iniciar Sesión</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="User"
            name="username"
            required
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="******"
            name="password"
            required
          />
        </Form.Group>
        <Button type="submit">Enviar</Button>
      </Form>
    </Modal.Body>
    </Modal>
    </>
  );  
};

export default MainNavbar;
