import React ,{useEffect}from "react";
import { Link, Outlet } from "react-router-dom";
import { usePurchaseOrders } from "./PurchaseOrderContext";

const PurchaseOrder = () => {
  const purchaseOrderData = usePurchaseOrders();
  const {
    purchaseOrders,
    handleDelete,
    purchaseOrderBtn,
    setPurchaseOrdersBtn,
    viewBtn,
    setViewBtn,
    addBtn,
    setAddBtn,
  } = purchaseOrderData;
  //  const handleShowAddBtn=()=>{
  //   setPurchaseOrdersBtn(false)
  //   setViewBtn(false)
  //  }
  useEffect(() => {
    setPurchaseOrdersBtn(false); // Hide Purchase Order button in Order Management component
  }, []);
  return (
    <div>
      <Link to="/ordermanagement/purchaseordertable">
        <button className="btn btn-primary">View</button>
      </Link>
      <Link to="/ordermanagement/purchaseorderformm">
        <button className="btn btn-success">Add</button>
      </Link>
      <Outlet />
    </div>
  );
};

export default PurchaseOrder;
