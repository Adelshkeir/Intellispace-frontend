import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import Adminproductcard from "./adminproductcard";
import "./adminproducts.css";

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
      const response = await axios.get("http://localhost:8080/product");
      setProducts(response.data);
      setProductLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/category");
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
      formData.append("image", productImage);
      formData.append("categoryId", selectedCategory);

      const response = await axios.post(
        "http://localhost:8080/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product creation response:", response.data);
      handleCloseModal();
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
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
        `http://localhost:8080/product/${editingProduct.id}`,
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
