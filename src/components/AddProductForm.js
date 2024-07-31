// src/components/AddProductForm.js
import React, { useState } from 'react';

const AddProductForm = ({ onProductAdded, setMessage, setMessageType }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !category || !description || !image) {
      setMessage('Todos los campos son obligatorios.');
      setMessageType('danger');
      return;
    }

    const newProduct = {
      title: name,
      price: parseFloat(price),
      category,
      description,
      image,
    };

    fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product added:', data);
        setMessage('Producto creado correctamente.');
        setMessageType('success');
        onProductAdded();
        setName('');
        setPrice('');
        setCategory('');
        setDescription('');
        setImage('');
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Error al crear el producto.');
        setMessageType('danger');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Precio</label>
        <input
          type="number"
          className="form-control"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Categoría</label>
        <input
          type="text"
          className="form-control"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Descripción</label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">Imagen (URL)</label>
        <input
          type="text"
          className="form-control"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Añadir Producto</button>
    </form>
  );
};

export default AddProductForm;
