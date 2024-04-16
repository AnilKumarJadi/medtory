import React from "react";
import { usePurchaseOrders } from "./PurchaseOrderContext";
import { Link } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
const PurchaseOrderUpdateForm = () => {
  const purchaseOrderData = usePurchaseOrders();
  const {
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
    handleFormUpdate,
    fetchPurchaseOrders,
  } = purchaseOrderData;

  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigat = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:4002/purchaseOrders/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  function handleSubmitUpdate(event) {
    event.preventDefault();
    axios
      .put("http://localhost:4002/purchaseOrders/" + id, data)
      .then((res) => {
        //  Swal("Product Created Successfully")
        swal({
          title: "Success",
          type: "success",
          text: "Product Updated Successfully.",
        });
        fetchPurchaseOrders();
        navigat("/purchaseordertable");
      });
  }
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <form className="col-4 " onSubmit={handleSubmitUpdate}>
        <div class="mb-3 ">
          <label htmlFor="id" class="form-label">
            ID
          </label>
          <input
            type="text"
            class="form-control"
            id="id"
            value={data.id}
            name="id"
            disabled
          />
        </div>
        <div class="mb-3 ">
          <label htmlFor="itemName" class="form-label">
            Item Name
          </label>
          <input
            type="text"
            class="form-control"
            id="itemName"
            value={data.itemName}
            name="itemName"
            onChange={(e) => setData({ ...data, itemName: e.target.value })}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="quantity" class="form-label">
            Quantity
          </label>
          <input
            type="text"
            class="form-control"
            id="quantity"
            value={data.quantity}
            name="quantity"
            onChange={(e) => setData({ ...data, quantity: e.target.value })}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="status" class="form-label">
            Supplier
          </label>
          <input
            type="text"
            class="form-control"
            id="Supplier"
            value={data.supplier}
            name="update"
            onChange={(e) => setData({ ...data, supplier: e.target.value })}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="status" class="form-label">
            Status
          </label>
          <input
            type="text"
            class="form-control"
            id="status"
            value={data.status}
            name="status"
            onChange={(e) => setData({ ...data, status: e.target.value })}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default PurchaseOrderUpdateForm;
// import React, { useState, useEffect } from "react";
// import { usePurchaseOrders } from "./PurchaseOrderContext";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import swal from "sweetalert";

// const PurchaseOrderForm = () => {
//   const purchaseOrderData = usePurchaseOrders();
//   const {
//     purchaseOrders,
//     setPurchaseOrders,
//     formData,
//     setFormData,
//     editId,
//     setEditId,
//     error,
//     setError,
//     handleFormSubmit,
//     handleInputChange,
//     handleEdit,
//     handleDelete,
//   } = purchaseOrderData;

//   const { id } = useParams();
//   const [data, setData] = useState([]);
//   const navigat = useNavigate();

//   const handleInputUpdate = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:4002/purchaseOrders/" + id)
//       .then((res) => {
//         setData(res.data);
//         console.log("Data fetched:", res.data); // Log fetched data
//       })
//       .catch((err) => console.log("Error fetching data:", err));
//   }, [id]);

//   const handleFormUpdate = (event) => {
//     event.preventDefault();
//     axios
//       .put("http://localhost:4002/purchaseOrders/" + id, data)
//       .then((res) => {
//         console.log("Update response:", res.data); // Log update response
//         swal({
//           title: "Success",
//           type: "success",
//           text: "Product Updated Successfully.",
//         });
//         navigat("/purchaseordertable");
//       })
//       .catch((error) => {
//         console.error("Error updating purchase order:", error);
//         swal({
//           title: "Error",
//           type: "error",
//           text: "Failed to update purchase order.",
//         });
//       });
//   };

//   return (
//     <div>
//       <h1>Purchase Orders</h1>
//       <form onSubmit={handleFormUpdate}>
//         <input
//           type="text"
//           name="itemName"
//           value={data.itemName}
//           onChange={handleInputUpdate}
//           placeholder="Item Name"
//           required
//         />
//         <input
//           type="number"
//           name="quantity"
//           value={data.quantity}
//           onChange={handleInputUpdate}
//           placeholder="Quantity"
//           required
//         />
//         <input
//           type="text"
//           name="supplier"
//           value={data.supplier}
//           onChange={handleInputUpdate}
//           placeholder="Supplier"
//           required
//         />
//         <input
//           type="text"
//           name="status"
//           value={data.status}
//           onChange={handleInputUpdate}
//           placeholder="Status"
//           required
//         />
//         <Link to="/purchaseordertable">
//           <button type="submit">Update Purchase Order</button>
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default PurchaseOrderForm;
