import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2"
export const purchaseContext = createContext();
export const PuschaseOrderProvider = ({ children }) => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: 1,
    // supplier: "select...",
    // status: "select..",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(false);
  const [purchaseOrderBtn, setPurchaseOrdersBtn] = useState(true);
  const [viewBtn, setViewBtn] = useState(true);
  const [addBtn, setAddBtn] = useState(true);
  const [upDateBtn,setUpdateBtn]=useState(false)
  const [showInventoryBtn,setShowInventoryBtn]=useState(true)

  console.log(purchaseOrders);
  useEffect(() => {
    fetchPurchaseOrders();
  }, []);
  console.log(formData.supplier);
  const fetchPurchaseOrders = () => {
    axios
      .get("http://localhost:4002/purchaseOrders")
      .then((response) => {
        console.log(response);
        setPurchaseOrders(response.data);
        if (response.status === 404) {
          throw new Error("404....Data not found");
        }
        setError(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true);
      });
  };
  const generateRandomId = () => {
    let randomId = "Med" + Math.floor(Math.random() * 10000);
    while (purchaseOrders.some((order) => order.id === randomId)) {
      randomId = "Med" + Math.floor(Math.random() * 10000);
    }
    return randomId;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newFormData = { ...formData, id: generateRandomId() };
    if (editId) {
      // Update existing purchase order
      axios
        .put(`http://localhost:4002/purchaseOrders/${editId}`, newFormData)
        .then(() => {
          fetchPurchaseOrders();
          setEditId(null);
          setFormData({
            itemName: "",
            quantity: 1,
            // supplier: "select...",
            // status: "select...",
          }); 
          let resetSupplier=document.getElementById('supplier');
          resetSupplier.value='';
          let resetStatus=document.getElementById('status');
          resetStatus.value=''// Reset form data
          setUpdateBtn(false); // Reset update button state if needed
          
        })
        .catch((error) => {
          console.error("Error updating purchase order:", error);
        });
    } else {
      // Add new purchase order
      axios
        .post("http://localhost:4002/purchaseOrders", newFormData)
        .then(() => {
          fetchPurchaseOrders();
          setFormData({
            itemName: "",
            quantity: 1,
            // supplier: "select...",
            // status: "select...",
          }); // Reset form data
          let resetSupplier=document.getElementById('supplier');
          resetSupplier.value='';
          let resetStatus=document.getElementById('status');
          resetStatus.value=''

        })
        .catch((error) => {
          console.error("Error adding purchase order:", error);
        });
    }
  };
  
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (orderId) => {
    const orderToEdit = purchaseOrders.find((order) => order.id === orderId);
    setFormData(orderToEdit);
    setEditId(orderId);
    setUpdateBtn(true);
  };

  const handleDelete = (orderId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      axios
          .delete(`http://localhost:4002/purchaseOrders/${orderId}`)
          .then(() => {
            fetchPurchaseOrders(); // Fetch updated data after successful deletion
          })
          .catch((error) => {
            console.error("Error deleting purchase order:", error);
          });
        
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
}
  useEffect(() => {
    getSupplierData();
  }, []);
  const getSupplierData = () => {
    axios
      .get("http://localhost:5000/suppliers")
      .then((responce) => {
        setSupplierData(responce.data);
        setError(false);
        if (responce.status === 404) {
          throw new Error("404..File not found");
        }
      })
      .catch((error) => {
        console.error("error not found", error);
        setError(true);
      });
  };

  return (
    <purchaseContext.Provider
      value={{
        purchaseOrders,
        setPurchaseOrders,
        formData,
        setFormData,
        editId,
        setEditId,
        error,
        setError,
        handleFormSubmit,
        handleInputChange,
        handleEdit,
        handleDelete,
        fetchPurchaseOrders,
        getSupplierData,
        supplierData,
        setSupplierData,
        purchaseOrderBtn,
        setPurchaseOrdersBtn,
        viewBtn,
        setViewBtn,
        addBtn,
        setAddBtn,
        upDateBtn,
        setUpdateBtn,
        showInventoryBtn,setShowInventoryBtn
      }}
    >
      {children}
    </purchaseContext.Provider>
  );
};
export const usePurchaseOrders = () => {
  return useContext(purchaseContext);
};
