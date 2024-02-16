import React, { useState, useEffect } from "react";
import "./AddProductModal.css"; // Import your CSS file
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductModal = ({ isOpen, onClose, onAddProduct, productToUpdate }) => {
  const [formData, setFormData] = useState({
    external_id: "",
    name: "",
    variant_external_id: "",
    retail_price: "",
    sku: "",
    file_url: "http://your-domain.com/path/to/file.png",
    filename: "",
    embroidery_type: "flat",
    thumbnail: "", // Assuming thumbnail is a simple text input
    variant_id: 2, // Add variant_id with a default value
  });

  useEffect(() => {
    if (productToUpdate) {
      setFormData({
        external_id: productToUpdate.external_id || "",
        name: productToUpdate.name || "",
        variant_external_id: productToUpdate.variant_external_id || "4238244223",
        retail_price: productToUpdate.retail_price || "32.58",
        sku: productToUpdate.sku || "SKU123674",
        file_url: productToUpdate.file_url || "http://your-domain.com/path/to/file.png",
        filename: productToUpdate.filename || "product.png",
        embroidery_type: productToUpdate.embroidery_type || "flat",
        thumbnail: productToUpdate.thumbnail_url || "http://your-domain.com/path/to/thumbnail.png", // Assuming thumbnail is a simple text input
        variant_id: productToUpdate.variant_id || 2, // Add variant_id with a default value
      });
    }
  }, [productToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Get API key and token from localStorage
    const apiKey = localStorage.getItem("ApiKey");
    const token = localStorage.getItem("authToken");

    // Verify that API key and token are available
    if (!apiKey || !token) {
      console.error("API key or token not found in localStorage");
      return;
    }

    // Prepare the headers for Bearer Authorization
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    };

    // Prepare the product data in the specified JSON format
    const productData = {
      external_id: formData.external_id,
      name: formData.name,
      thumbnail: formData.thumbnail,
      variant_external_id: formData.variant_external_id,
      retail_price: formData.retail_price,
      sku: formData.sku,
      file_url: formData.file_url,
      filename: formData.filename,
      embroidery_type: formData.embroidery_type,
      variant_id: formData.variant_id, // Include variant_id in the productData
    };

    // If productToUpdate exists, it's an update operation; otherwise, it's an add operation
    const requestMethod = productToUpdate ? "put" : "post";
    const requestUrl = productToUpdate
      ? `${import.meta.env.VITE_REACT_APP_BASE_URL}products/update-product/${productToUpdate.id}`
      : `${import.meta.env.VITE_REACT_APP_BASE_URL}products/create-product`;

    // Make a POST or PUT request to create or update the product
    axios
      [requestMethod](requestUrl, productData, { headers })
      .then((response) => {
        // Handle the successful response from the server
        console.log(
          `Product ${productToUpdate ? "updated" : "created"} successfully:`,
          response.data
        );
        onClose(); // Close the modal after successful product creation/update
        onAddProduct(productData); // Add the new/updated product to the list (if it's an add operation)

        // Show success toast
        toast.success(`Product ${productToUpdate ? "updated" : "added"} successfully!`);
      })
      .catch((error) => {
        // Handle errors, such as invalid API key or server issues
        console.error(
          `Error ${productToUpdate ? "updating" : "creating"} product:`,
          error.response?.data || error.message
        );

        // Show error toast
        toast.error(`Error ${productToUpdate ? "updating" : "adding"} product. Please try again later.`);
      });
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="add-product-modal">
          <h1>{productToUpdate ? "Update Product" : "Add Product"}</h1>
          <div className="input-group">
            <input
              type="text"
              id="external_id"
              placeholder="Enter your External ID"
              name="external_id"
              value={formData.external_id}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="name"
              placeholder="Enter your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="variant_external_id"
              placeholder="Enter your Variant External ID"
              name="variant_external_id"
              value={formData.variant_external_id}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="retail_price"
              placeholder="Enter Retail Price"
              name="retail_price"
              value={formData.retail_price}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="sku"
              placeholder="Enter SKU"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="file_url"
              placeholder="Enter File URL"
              name="file_url"
              value={formData.file_url}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="filename"
              placeholder="Enter Filename"
              name="filename"
              value={formData.filename}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="embroidery_type"
              placeholder="Enter Embroidery Type"
              name="embroidery_type"
              value={formData.embroidery_type}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="thumbnail"
              placeholder="Enter Thumbnail URL"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="variant_id"
              placeholder="Enter Variant ID"
              name="variant_id"
              value={formData.variant_id}
              onChange={handleChange}
            />
          </div>
          <div className="button-group">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="add-btn" onClick={handleSubmit}>
              {productToUpdate ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddProductModal;
