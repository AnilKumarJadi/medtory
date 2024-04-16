import React from "react";
import { usePurchaseOrders } from "./PurchaseOrderContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link,Outlet } from "react-router-dom";

const PurchaseOrderFormm = () => {
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
    supplierData,
    setSupplierData,
    setPurchaseOrdersBtn,
    viewBtn,
    setView,
    addBtn,
    setAddBtn,setUpdateBtn,upDateBtn
  } = purchaseOrderData;
  return (
    <>
     
      <div className="purchaseForm d" >
      <Link to="/ordermanagement/purchaseordertable">
        <button className="btn btn-primary">View</button>
      </Link>
        <form className='purchaseOrderForm' onSubmit={handleFormSubmit}>
          <h3>Purchase Orders</h3>
          <div className="form-group">
            <label htmlFor="itemName">Item Name :</label>
            <input
              className="form-control"
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              placeholder="Item Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity :</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="supplier">Supplier :</label>
            <select
              className="form-control form-select"
              id="supplier"
              name="supplier"
              onChange={handleInputChange}
              aria-label="Default select example"
            >
              <option value="">Select...</option>
              {supplierData.map((data,index) => {
                return (
                  <option key={data.id} value={data.supplierName}>
                    {data.supplierName}
                  </option>
                );
              })}
            </select>
            {/* <ArrowDropDownIcon className="dropdown" /> */}
          </div>
          <div className="form-group">
            <label htmlFor="status">Status :</label>

            <select
              className="form-control form-select"
              name="status"
              id="status"
              onChange={handleInputChange}
            >
              <option value="">Select.......</option>
              {/* <option value="pending">Pending</option> */}
              <option value="approved">Approved</option>
              <option value="delivered">Delivered</option>
            </select>
            {/* <ArrowDropDownIcon className="dropdownn" /> */}
          </div>
          {upDateBtn?(<button type="submit" className="btn btn-primary mt-2">
            Update
          </button>):(<button type="submit" className="btn btn-primary mt-2">
            Add
          </button>)}
          
        </form>
      </div>
    </>
  );
};

export default PurchaseOrderFormm;
