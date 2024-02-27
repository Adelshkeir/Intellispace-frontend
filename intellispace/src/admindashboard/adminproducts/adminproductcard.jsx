import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const Adminproductcard = ({ product, fetchProducts }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productDescription, setProductDescription] = useState(
    product.description
  );
  const [curatorsPick, setCuratorsPick] = useState(product.curators_pick || false); // Initialize with product's curators_pick value, default to false if undefined

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8080/product/${product.id}`);

        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success",
        });

        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete product.",
        icon: "error",
      });
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/product/${product.id}`,
        {
          name: productName,
          price: productPrice,
          description: productDescription,
          curators_pick: curatorsPick, // Include curators_pick in the request body
        }
      );
      console.log("Product edit response:", response.data);
      handleCloseEditModal();
      fetchProducts();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="admin-product-card">
      <div className="admin-product-bg-image hover-overlay ripple ripple-surface ripple-surface-light">
        <img
          src={`http://localhost:8080/${product.image}`}
          className="admin-product-img-fluid"
          alt="Laptop"
        />
        <a href="#!">
          <div className="admin-product-mask"></div>
        </a>
      </div>
      <div className="admin-product-body">
        <h5 className="admin-product-title">{product.name}</h5>
        <p className="admin-product-text">{product.price}</p>
        <p className="admin-product-text">{product.description}</p>
      </div>
      <div className="admin-product-body">
        <Button
          variant="danger"
          className="admin-product-delete"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          variant="primary"
          className="admin-product-edit"
          onClick={handleEdit}
        >
          Edit
        </Button>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
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
            <Form.Group controlId="formCuratorsPick">
              <Form.Check
                type="checkbox"
                label="Curator's Pick"
                checked={curatorsPick}
                onChange={(event) => setCuratorsPick(event.target.checked)}
              />
            </Form.Group>
            <Button
              variant="primary mt-3"
              className="SubmitButton"
              type="button"
              onClick={handleEditSubmit}
            >
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Adminproductcard;
