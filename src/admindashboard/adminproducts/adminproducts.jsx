import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import Adminproductcard from "./adminproductcard";
import "./adminproducts.css";
import firebase from "firebase/compat/app"; // Modify this line
import "firebase/compat/storage"; // Modify this line

const firebaseConfig = {
  apiKey: "AIzaSyBJRiwL87PHG39TLvdeUqnt_CQVlEEO0as",
  authDomain: "intelispace-82b49.firebaseapp.com",
  projectId: "intelispace-82b49",
  storageBucket: "intelispace-82b49.firebasestorage.app",
  messagingSenderId: "57308685445",
  appId: "1:57308685445:web:bff63199d67eb17114f5ec",
  measurementId: "G-CMK3C30BH5",
};

const app = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productLoading, setProductLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [curatorsPick, setCuratorsPick] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URI + "/product"
      );
      setProducts(response.data);
      setProductLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URI + "/category"
      );
      setCategories(response.data);
      setCategoryLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategoryLoading(false);
    }
  };

  const handleCreateButtonClick = () => {
    setShowModal(true);
    setEditingProduct(null);
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductImage(null);
    setSelectedCategory("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductImage(null);
    setSelectedCategory("");
    setEditingProduct(null);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("price", productPrice);
      formData.append("description", productDescription);
      console.log("ProductImage:", productImage);
      const imageRef = storage.ref(`images/${productImage.name}`);
      await imageRef.put(productImage);
      const imageUrl = await imageRef.getDownloadURL();
      console.log(imageUrl);
      formData.append("image", imageUrl);
      formData.append("categoryId", selectedCategory);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleCloseModal();
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
    console.log("ProductImage:", productImage);
  };

  const handleEditButtonClick = (product) => {
    setEditingProduct(product);
    setShowModal(true);
    setProductName(product.name);
    setProductPrice(product.price);
    setProductDescription(product.description);
    setCuratorsPick(product.curators_pick || false);
  };

  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("price", productPrice);
      formData.append("description", productDescription);
      formData.append("curators_pick", curatorsPick);
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URI}/product/${editingProduct.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product edit response:", response.data);
      handleCloseModal();
      fetchProducts();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <>
      <button
        className="admin-product-Create"
        onClick={handleCreateButtonClick}
        style={{ marginTop: "30px" }}
      >
        Create
      </button>
      <div className="products-container">
        {productLoading ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <Adminproductcard
              key={product.id}
              product={product}
              fetchProducts={fetchProducts}
              onEditClick={handleEditButtonClick}
            />
          ))
        )}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? "Edit Product" : "Create Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                required={true}
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                required={true}
                value={productPrice}
                onChange={(event) => setProductPrice(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                rows={3}
                value={productDescription}
                onChange={(event) => setProductDescription(event.target.value)}
              />
            </Form.Group>
            {!editingProduct && (
              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  required={true}
                  onChange={(event) => setProductImage(event.target.files[0])}
                />
              </Form.Group>
            )}
            {!editingProduct && (
              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                >
                  <option value="">Select category...</option>
                  {categoryLoading ? (
                    <option value="" disabled>
                      Loading categories...
                    </option>
                  ) : (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  )}
                </Form.Control>
              </Form.Group>
            )}
            <Button
              variant="primary mt-3"
              className="SubmitButton"
              type="button"
              onClick={editingProduct ? handleEditSubmit : handleSubmit}
            >
              {editingProduct ? "Save Changes" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductsPage;
