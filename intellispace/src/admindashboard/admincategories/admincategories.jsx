import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import "./admincategories.css";
import Admincategorycard from "./admincategorycard";

const Admincategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

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
    setEditingCategory(null);
    setCategoryName("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCategoryName("");
    setEditingCategory(null);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/category", {
        name: categoryName,
      });
      console.log("Category creation response:", response.data);
      handleCloseModal();
      fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleEditButtonClick = (category) => {
    setEditingCategory(category);
    setShowModal(true);
    setCategoryName(category.name);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/category/${editingCategory.id}`,
        {
          name: categoryName,
        }
      );
      console.log("Category edit response:", response.data);
      handleCloseModal();
      fetchCategories();
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  return (
    <>
      <button
        className="admin-category-Create"
        onClick={handleCreateButtonClick}
        style={{ marginTop: "30px" }}
      >
        Create
      </button>
      <Table striped bordered hover className="admin-category-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Number of Products</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryLoading ? (
            <tr>
              <td colSpan="3">Loading categories...</td>
            </tr>
          ) : (
            categories.map((category, index) => (
              <Admincategorycard
                key={category.id}
                category={category}
                index={index + 1}
                onEditClick={handleEditButtonClick}
                fetchCategories={fetchCategories}
              />
            ))
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCategory ? "Edit Category" : "Create Category"}
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
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary mt-3"
              className="SubmitButton"
              type="button"
              onClick={editingCategory ? handleEditSubmit : handleSubmit}
            >
              {editingCategory ? "Save Changes" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Admincategories;
