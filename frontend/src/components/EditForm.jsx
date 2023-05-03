import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import FormImage from "../assets/images/storydots-logo.jpeg";
import { useState, useEffect } from "react";

const EditForm = () => {

  let navigate = useNavigate();
  const {id} = useParams();

  const [product, setProduct] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.SERVER_URI}/products/${id}`)
    .then((response) => {
      setProduct(response.data)
    })
    .catch((e) => {
      console.log(e)
    })

    axios.get(`${process.env.SERVER_URI}/products/brands`)
    .then((response) => {
      setBrands(response.data)
    })
    .catch((e) => {
      console.log(e)
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
      
      let values = {
        name : e.target.elements.name.value,
        description : e.target.elements.description.value,
        price : e.target.elements.price.value,
        image_url : e.target.elements.image.value,
        brand_id : e.target.elements.brand.value,
      }

      const token = localStorage.getItem('accessToken')
      axios
        .put(`${process.env.SERVER_URI}/products/${id}`, values, { headers: {accessToken: token} })
        .then((response) => {
          console.log(response);
          if (response.data === "Successful") {
            alert("Producto correctamente modificado!")
            navigate(`/detail/${id}`)
          }
        })
        .catch((e) => {
            console.log(e)
        }
        );
    }

  return (
    <div className="bg-light text-dark" style={{ padding: "5em 0" }}>
      <Container className="px-3 mx-auto">
        <Row className="justify-content-center">
          <Col md={12} lg={10} className="px-3">
            <Row className="rounded shadow bg-white">
              <Col md={5} className="px-0">
                <Image
                  fluid
                  src={product.image_url ? product.image_url : FormImage}
                  className="w-100 h-100 rounded-start"
                  alt="login-image"
                  style={{ objectFit: "cover" }}
                />
              </Col>
              <Col md={7} className="p-4 p-md-5">
                <div className="d-flex justify-content-between">
                  <div className="w-60 text-start">
                    <h3 className="mb-4">EDITAR PRODUCTO</h3>
                  </div>
                </div>
                <Form onSubmit={handleSubmit}>
                  <FloatingLabel
                    className="mb-3"
                    controlId="createInputName"
                    label="Nombre del producto"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Nombre del producto"
                      name="name"
                      value={product.name}
                      onChange={e => setProduct({...product, name: e.target.value})}
                      required
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    className="mb-3"
                    controlId="createInputDescription"
                    label="Descripción detallada"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Descripción detallada"
                      name="description"
                      value={product.description}
                      onChange={e => setProduct({...product, description: e.target.value})}
                      required
                      style={{ height: '100px' }}
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    className="mb-3"
                    controlId="createInputImage"
                    label="Imagen del producto"
                  >
                    <Form.Control
                      type="url"
                      placeholder="https://example.com"
                      name="image"
                      value={product.image_url}
                      onChange={e => setProduct({...product, image_url: e.target.value})}
                      required
                    />
                  </FloatingLabel>

                  <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <FloatingLabel
                      controlId="registerInputPrice"
                      label="Precio"
                      >
                      <Form.Control
                      type="number"
                      placeholder="Precio"
                      value={product.price}
                      onChange={e => setProduct({...product, price: e.target.value})}
                      name="price"
                      required
                      />
                  </FloatingLabel>
                  </InputGroup>

                  <FloatingLabel
                      className="mb-3"
                      controlId="registerSelectBrand"
                      label="Marca"
                  >
                      <Form.Select
                      name="brand"
                      >
                      {brands.map((option,i) => (
                          <option value={option.id} key={i}>{option.name}</option>
                      ))}
                      </Form.Select>
                  </FloatingLabel>

                   
                    <Row className="g-2">
                    <Col md>
                        <Button
                            variant="warning"
                            type="submit"
                            className="w-100"
                        >
                            ENVIAR
                        </Button>
                    </Col>
                    <Col md>
                    <Button
                    variant="danger"
                    type="reset"
                    className="w-100"
                  >
                    BORRAR
                  </Button>
                    </Col>
                    </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditForm;
