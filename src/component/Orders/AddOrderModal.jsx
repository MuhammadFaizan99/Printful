import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddOrderModal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddOrderModal = ({ isOpen, onClose, selectedOrder, isUpdateMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    address1: "",
    city: "",
    state_code: "",
    country_code: "",
    zip: "",
    variant_id: "",
    quantity: "",
    url: "",
  });

  useEffect(() => {
    // Populate form data with selected order values when in "Update" mode
    if (isUpdateMode && selectedOrder) {
      const { recipient, items } = selectedOrder;
      setFormData({
        name: recipient.name,
        address1: recipient.address1,
        city: recipient.city,
        state_code: recipient.state_code,
        country_code: recipient.country_code,
        zip: recipient.zip,
        variant_id: items[0].variant_id,
        quantity: items[0].quantity,
        url: items[0].files[0].url,
      });
    } else {
      // Clear form data when in "Add" mode
      setFormData({
        name: "",
        address1: "",
        city: "",
        state_code: "",
        country_code: "",
        zip: "",
        variant_id: "",
        quantity: "",
        url: "",
      });
    }
  }, [selectedOrder, isUpdateMode]);

  const modalTitle = isUpdateMode ? "Update Order" : "Add Order";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const orderData = {
        recipient: {
          name: formData.name,
          address1: formData.address1,
          city: formData.city,
          state_code: formData.state_code,
          country_code: formData.country_code,
          zip: formData.zip,
        },
        items: [
          {
            variant_id: formData.variant_id,
            quantity: formData.quantity,
            files: [
              {
                url: formData.url,
              },
            ],
          },
        ],
      };

      if (isUpdateMode) {
        // Update an existing order
        const response = await axios.put(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}orders/update-order/${selectedOrder.id}`,
          orderData,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log("Order updated successfully:", response.data);
        // Show success toast
        toast.success("Order updated successfully!");
      } else {
        // Create a new order
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}orders/create-order`,
          orderData,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log("Order created successfully:", response.data);
        // Show success toast
        toast.success("Order created successfully!");
      }

      // Close the modal after a successful order creation/update
      onClose();
    } catch (error) {
      console.error(isUpdateMode ? "Error updating order:" : "Error creating order:", error);
      // Show error toast
      toast.error(isUpdateMode ? "Error updating order. Please try again later." : "Error creating order. Please try again later.");
      // Handle any errors here
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="add-order-modal">
          <h1>{modalTitle}</h1>
          <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Address1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="State Code"
              name="state_code"
              value={formData.state_code}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Country Code"
              name="country_code"
              value={formData.country_code}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="ZIP"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Variant ID"
              name="variant_id"
              value={formData.variant_id}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Image URL"
              name="url"
              value={formData.url}
              onChange={handleChange}
            />
          </div>
          <div className="button-group">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="add-btn" onClick={handleSubmit}>
              {isUpdateMode ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddOrderModal;
