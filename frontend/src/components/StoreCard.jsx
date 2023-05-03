import { Link, useNavigate } from "react-router-dom";
import './StoreCard.css'

import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import Image from "react-bootstrap/Image";

const StoreCard = ({items}) => {
    return ( 
        <>
        {items.map((item, i) => {
            return (
            <Col xs={12} sm={6} lg={4} className='mb-4' key={i}>
                <Card bg="light" className="h-100 shadow store-card position-relative">
                    <Card.Img variant="top" src={item.image_url} style={{height: '250px', objectFit: 'contain'}} alt={item.name} />
                    <Card.Body className="text-center d-flex flex-column">
                        <Card.Title className="card-product-title fs-3">{item.name}</Card.Title>
                        <Card.Text className="card-product-price fs-2 fw-bold mb-0">${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Card.Text>
                        <Card.Text className="fs-2 fw-bold mb-0">{item.brands.name}<Image src={item.brands.logo_url} className="ms-2" style={{height: '20px'}} alt={item.brands.name} /></Card.Text>       
                    </Card.Body>
                    <Link to={`/detail/${item.id}`} className='stretched-link'/>
                </Card>
            </Col>
            )
        })}
        </>
    );
}
 
export default StoreCard;