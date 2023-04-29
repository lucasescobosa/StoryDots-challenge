import { useState, useEffect } from "react";
import axios from "axios";
import styles from '@/styles/Home.module.css'

import Card from 'react-bootstrap/Card';


const Products = () => {

    const [items, setItems] = useState([])

    useEffect (() => {
        axios.get('http://localhost:3001/products')
        .then((response)=> {
            setItems(response.data)
        })
        .catch((e)=>console.log(e))  
    }, [])

    return ( 
        <div className={styles.grid}>
        {items.map((item, i) => {
            return (
                <Card bg="dark" className="shadow store-card position-relative p-3 m-3" key={i}>
                    <Card.Img variant="top" src={`${item.image_url}`} style={{height: '250px', objectFit: 'contain'}} alt={item.name} />
                    <Card.Body className="text-center d-flex flex-column">
                        <Card.Title className="card-product-title fs-3">{item.name}</Card.Title>
                        <Card.Text className="card-product-price fs-2 fw-bold mb-0">${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Card.Text>    
                    </Card.Body>
                    <a className="stretched-link"></a>
                </Card>
            )
        })}
        </div>
     );
}
 
export default Products;