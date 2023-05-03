import { useState, useEffect, useContext } from "react";
import UserContext from "../components/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './Detail.css'
import MainNavbar from "../components/MainNavbar.jsx";
import {LinkContainer} from 'react-router-bootstrap'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Image from 'react-bootstrap/Image'

const Detail = () => {
    const {id} = useParams();
    let navigate = useNavigate();
    const { isLogged, setIsLogged } = useContext(UserContext);
    const [item, setItem] = useState({
        id: null,
        name: null,
        description: '',
        price: 0,
        image_url: [{main: null, name: null}],
    })

    useEffect (() => {
        axios.get(`${process.env.SERVER_URI}/products/${id}`)
        .then((response)=> {
            console.log(response)
            setItem(response.data)
        })
        .catch((e)=>console.log(e))
    }, [])


    const handleDelete = () => {
        const token = localStorage.getItem('accessToken')
        axios
          .delete(`${process.env.SERVER_URI}/products/${id}`,{ headers: {accessToken: token}})
          .then((response) => {
            if (response.data === "Successful") {
              alert("Producto correctamente eliminado!")
              navigate('/')
            }
          })
          .catch((e) => {
              console.log(e)
          }
          );
      }

    return ( 
        <>
        <MainNavbar current={"store"}/>
        <div style={{paddingTop: '100px'}}>
            <div className="bg-light py-3">
            <Container className="bg-light text-dark my-5">
                <Card className="shadow border border-0">
                    <Row className="g-0">
                        <Col xs={12} md={6} className='border-end'>
                            <Image src={item.image_url} style={{width: '100%' , objectFit: 'contain'}} alt={item.name}/>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="p-3 right-side">
                            <Card.Title className="card-product-title fs-1">{item.name}</Card.Title>
                            <Card.Text className="card-product-price fs-2 fw-bold mb-0">${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Card.Text>
                            <Card.Text className="card-product-price fs-2 mb-0">{item.description}</Card.Text>
                        
                                {(isLogged) ? (
                                    <div className="buttons d-flex flex-row mt-4 gap-2">
                                    <LinkContainer to={`/edit/${id}`}><Button variant="success" className="w-50 p-2">Editar</Button></LinkContainer>
                                    <Button variant="danger" className="w-50 p-2" onClick={handleDelete}>Eliminar</Button>
                                    </div>
                                    ) : (null)
                                }
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>
            </div>
        </div>
        </>
     );
}
 
export default Detail;