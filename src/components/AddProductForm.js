import React, { useState, useEffect } from 'react';

const AddProductForm = ({ onProductAdded, handleClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    // Fetch categories from the API
    fetch('https://fakestoreapi.com/products/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => {
        console.error('Error fetching categories:', error);
        setMessage('Error al cargar las categorías.');
        setMessageType('danger');
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar los campos
    if (!name || !price || !category || !description || !image) {
      setMessage('You must fill in all the fields.');
      setMessageType('danger');
      return;
    }

    // Crear un nuevo producto
    const newProduct = {
      title: name,
      price: parseFloat(price),
      category,
      description,
      image,
    };

    // Enviar el producto al API
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
        setMessage('Product added correctly.');
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
        setMessage('Error creating the product.');
        setMessageType('danger');
      });
  };

  return (
    <div>
      {message && (
        <div className={`alert alert-${messageType}`} role="alert">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select 
            className="form-select" 
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image (URL)</label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark">Add product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
