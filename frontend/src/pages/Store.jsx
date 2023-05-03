import { useState, useEffect } from "react";
import axios from "axios";

import StoreCard from "../components/StoreCard.jsx";
import MainNavbar from "../components/MainNavbar.jsx";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Store = () => {

    const [items, setItems] = useState([])

    useEffect (() => {
        axios.get(`${process.env.SERVER_URI}/products`)
        .then((response)=> {
            console.log(response)
            setItems(response.data)
        })
        .catch((e)=>console.log(e))  
    }, [])

    return ( 
        <>
        <MainNavbar/>
            <div style={{paddingTop: '100px'}}>
                <Container fluid className="bg-light">
                    <Row className="mx-lg-5">
                        <Col xs={12} className='ps-2'>
                            <Row className="p-4">
                                <StoreCard items={items}/>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
     );
}
 
export default Store;