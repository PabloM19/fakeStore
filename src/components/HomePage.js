import React, { useState, useEffect } from 'react';
import { Carousel, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import './HomePage.css';
import carrusel1 from '../assets/carrusel1.png'
import carrusel2 from '../assets/carrusel2.png'
import carrusel3 from '../assets/carrusel3.png'

const HomePage = () => {
    // Estado para almacenar los productos
    const [products, setProducts] = useState([]);
    const [email, setEmail] = useState("");

    // useEffect para obtener los productos al montar el componente
    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=3')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías agregar la lógica para manejar la suscripción al newsletter
        console.log('Email submitted:', email);
    };

    return (
        <div>
            <Header />

            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={carrusel1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Electronics Exclusive Items</h3>
                        <p>With all the Fake Store electronics gadgets you can go through the next level.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={carrusel2}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Jewlery Exclusive Items</h3>
                        <p>With all the Fake Store jewlery items you can achieve your luxury goals.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={carrusel3}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Women's Clothes Exclusive Items</h3>
                        <p>With all the Fake Store women's clothes you can go anywhere stunning.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <Container className="my-5">
                <h2 className="text-center mb-4">Our Products Selection</h2>
                <Row>
                    {products.map(product => (
                        <Col md={4} className="mb-4" key={product.id}>
                            <Card className="h-100">
                                <Card.Img variant="top" src={product.image} alt={product.title} style={{ objectFit: "contain", height: "300px" }} />
                                <Card.Body className="d-flex flex-column">
                                    <div style={{ flex: 1 }}>
                                        <Card.Title>{product.title}</Card.Title>
                                    </div>
                                    <div className="mt-auto">
                                        <Card.Text>
                                            <strong>Category:</strong> {product.category}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Price:</strong> ${product.price.toFixed(2)}
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Container fluid className="my-5">
                <h3 className="text-center mb-4">Or Subscribe To The Newsletter</h3>
                <Form onSubmit={handleSubmit} className="d-flex justify-content-center">
                    <div className="custom-width-65">
                        <Form.Group controlId="formEmail" className="d-flex w-100 align-items-center">
                            <Form.Control
                                type="email"
                                placeholder="Email address..."
                                value={email}
                                onChange={handleEmailChange}
                                className="flex-grow-1 me-2"
                                required
                            />
                            <Button type="submit" className="btn btn-dark">Submit</Button>
                        </Form.Group>
                    </div>
                </Form>
            </Container>

            <Footer />
        </div>
    );
};

export default HomePage;
