import React, { useState, useEffect } from 'react';
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { useCategory } from '../contexts/CategoryContext';
import Header from './Header';
import Footer from './Footer';
import './HomePage.css';
import carrusel1 from '../assets/carrusel1.png';
import carrusel2 from '../assets/carrusel2.png';
import carrusel3 from '../assets/carrusel3.png';

const HomePage = () => {
    const { updateCategory } = useCategory();
    const navigate = useNavigate(); // Inicializar useNavigate

    const [products, setProducts] = useState([]);
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=3')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleCarouselClick = (category) => {
        updateCategory(category); // Actualizar la categoría
        navigate('/products'); // Navegar a la página de productos
    };

    return (
        <div>
            <Header />
            <Carousel>
                <Carousel.Item onClick={() => handleCarouselClick('electronics')}>
                    <img className="d-block w-100" src={carrusel1} alt="First slide" />
                    <Carousel.Caption>
                        <h3>Electronics Exclusive Items</h3>
                        <p>With all the Fake Store electronics gadgets you can go through the next level.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item onClick={() => handleCarouselClick('jewelery')}>
                    <img className="d-block w-100" src={carrusel2} alt="Second slide" />
                    <Carousel.Caption>
                        <h3>Jewelry Exclusive Items</h3>
                        <p>With all the Fake Store jewelry items you can achieve your luxury goals.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item onClick={() => handleCarouselClick("women's clothing")}>
                    <img className="d-block w-100" src={carrusel3} alt="Third slide" />
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
                            <Card className="h-100" onClick={() => handleCarouselClick(product.category)}>
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

            <Footer />
        </div>
    );
};

export default HomePage;
