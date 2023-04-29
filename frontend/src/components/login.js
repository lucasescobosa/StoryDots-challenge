import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Login = () => {

    const [isLogged, setIsLogged] = useState(false)
    useEffect(() => {
        (localStorage.getItem('accessToken')) ? setIsLogged(true): setIsLogged(false)
      }, [isLogged])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        let values = {
            username : e.target.elements.username.value,
            password : e.target.elements.password.value
        }
        axios.post('http://localhost:3001/login', values)
        .then((response) => {
            if (!response.data.error) {
              localStorage.setItem("accessToken", response.data.token);        
              handleClose();
              window.location.reload(true)
            }
            else {
                alert(response.data.error);
            }
          })
          .catch((e) => {
            console.log(e);
          });
    }

    const Logout = () => {
        localStorage.removeItem('accessToken')
        setIsLogged(false)
    }

    return (
        <>
        {isLogged === false ?
        (<a onClick={handleShow}>
            <p>Iniciar Sesión</p>
        </a>)
        :
        (<><a onClick={Logout}>
            <p>Cerrar Sesión</p>
        </a>
        <a onClick={Logout}>
            <p>Crear producto</p>
        </a></>
        )}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title style={{color: 'black'}}>Iniciar Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <Form.Label style={{color: 'black'}}>Usuario</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    name='username'
                    autoFocus
                    required
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label style={{color: 'black'}}>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="********"
                    name='password'
                    required
                />
                </Form.Group>
                <Button variant="primary" type="submit" style={{float: 'right', marginTop: '10px'}}>
                    Enviar
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
        </>
  );
}

export default Login;