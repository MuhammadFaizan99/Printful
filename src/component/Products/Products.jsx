import React, { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import "./Products.css";
import AddProductModal from "./AddProductModal";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}products/get-products`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data.result);
        setProducts(response.data.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const openModal = () => {
    setProductToUpdate(null);
    setModalOpen(true);
  };

  const openUpdateModal = (product) => {
    setProductToUpdate(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddProduct = (formData) => {
    const newProduct = {
      No: products.length + 1,
      external_id: formData.external_id,
      name: formData.name,
      variants: formData.variants,
      thumbnail_url: formData.thumbnail_url,
    };

    setProducts([...products, newProduct]);

    closeModal();
  };

  const handleDeleteProduct = (id) => {
    const token = localStorage.getItem("authToken");

    axios
      .delete(`${import.meta.env.VITE_REACT_APP_BASE_URL}products/delete-product/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log("Product deleted successfully:", response.data.message);
        setProducts(products.filter((product) => product.external_id !== id));
        toast.success('Product deleted successfully!');
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error('Error deleting product. Please try again later.');
      });
  };

  const indexOfLastProduct = currentPage * perPage;
  const indexOfFirstProduct = indexOfLastProduct - perPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="product-container">
      <div className="header">
        <h1>Your Products</h1>
        <button className="add-products-button" onClick={openModal}>
          <i className="fas fa-plus"></i> Add Product
        </button>
      </div>
      {isLoading ? (
        <div className="loader">
          <i className="fas fa-spinner fa-spin"></i> Loading...
        </div>
      ) : products.length === 0 ? (
        <div className="no-products-text">No Product to show</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>external_id</th>
                <th>Name</th>
                <th>Variants</th>
                <th>Thumbnail</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <Transition
                  key={product.external_id}
                  in={true}
                  appear={true}
                  timeout={500}
                >
                  {(state) => (
                    <tr className={`transition-${state}`}>
                      <td>{index + 1}</td>
                      <td>{product.external_id}</td>
                      <td>{product.name}</td>
                      <td>{product.variants}</td>
                      <td>
                        <img
                          src={product.thumbnail_url}
                          alt={product.name}
                          className="thumbnail"
                        />
                      </td>
                      <td>
                        <div className="main-button">
                          <button
                            className="update-button"
                            onClick={() => openUpdateModal(product)}
                          >
                            Update
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </Transition>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: Math.ceil(products.length / perPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddProduct={handleAddProduct}
        productToUpdate={productToUpdate}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Products;
