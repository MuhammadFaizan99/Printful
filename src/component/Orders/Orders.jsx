import React, { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import "./Orders.css";
import Axios from "axios";
import AddOrderModal from "./AddOrderModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isUpdateMode, setUpdateMode] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6);

  const openModal = () => {
    setSelectedOrder(null);
    setUpdateMode(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const fetchOrders = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await Axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}orders/get-orders`,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );

      const allOrders = response.data.result;
      const nonCanceledOrders = allOrders.filter(
        (order) => order.status !== "canceled"
      );
      setOrders(nonCanceledOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await Axios.delete(`${import.meta.env.VITE_REACT_APP_BASE_URL}orders/delete-order/${orderId}`, {
        headers: {
          Authorization: `${authToken}`,
        },
      });

      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      toast.success("Order canceled successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error canceling order. Please try again later.");
    }
  };

  const openUpdateModal = (order) => {
    setSelectedOrder(order);
    setUpdateMode(true);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="order-container">
      <div className="header">
        <h1>Your Orders</h1>
        <button className="add-orders-button" onClick={openModal}>
          <i className="fas fa-plus"></i> Add Order
        </button>
      </div>
      {isLoading ? (
        <div className="loader">
          <i className="fas fa-spinner fa-spin"></i> Loading...
        </div>
      ) : orders.length === 0 ? (
        <div className="no-orders-text">No orders to show</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Recipient Name</th>
                <th>Recipient Country Name</th>
                <th>Currency</th>
                <th>Total Cost</th>
                <th>Dashboard URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <Transition key={order.id} in={true} appear={true} timeout={500}>
                  {(state) => (
                    <tr className={`transition-${state}`}>
                      <td>{index + 1}</td>
                      <td>{order.items[0].name}</td>
                      <td>{order.items[0].quantity}</td>
                      <td>{order.recipient.name}</td>
                      <td>{order.recipient.country_name}</td>
                      <td>{order.retail_costs.currency}</td>
                      <td>{order.costs.total}</td>
                      <td>
                        <a
                          href={order.dashboard_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {order.dashboard_url}
                        </a>
                      </td>
                      <td>
                        <div className="main-button">
                          <button
                            className="update-button"
                            onClick={() => openUpdateModal(order)}
                          >
                            Update
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => cancelOrder(order.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </Transition>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }).map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}>
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
      {isModalOpen && (
        <AddOrderModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedOrder={selectedOrder}
          isUpdateMode={isUpdateMode}
        />
      )}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Orders;
