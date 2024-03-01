import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
const Admincategorycard = ({
  category,
  index,
  onEditClick,
  fetchCategories,
}) => {
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
        // Perform delete action here
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_URI}/category/${category.id}`
        );

        // Show success message
        Swal.fire({
          title: "Deleted!",
          text: "Your category has been deleted.",
          icon: "success",
        });

        // Fetch categories again after deletion
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      // Show error message if deletion fails
      Swal.fire({
        title: "Error",
        text: "Failed to delete category.",
        icon: "error",
      });
    }
  };

  return (
    <tr>
      <td>{index}</td>
      <td>{category.name}</td>
      <td>{category.Products.length}</td>
      <td>
        <button
          className="admin-categories-button"
          onClick={() => onEditClick(category)}
        >
          Edit
        </button>
        <button className="admin-categories-button" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Admincategorycard;
