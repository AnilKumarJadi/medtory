import React ,{useEffect}from "react";
import { useNavigate ,Link, NavLink,Outlet} from "react-router-dom";
import { usePurchaseOrders } from "../PurchaseOrderContext";

const OrderManagement = () => {
  // const navigate = useNavigate();
  // const handlePuchaseOrder = () => {
  //   navigate("/purchaseorder");
  //  };
  const purchaseOrderData = usePurchaseOrders();
  const { purchaseOrders, handleDelete, purchaseOrderBtn,
    setPurchaseOrdersBtn,
    viewBtn,
    setView,
    addBtn,
    setAddBtn, } = purchaseOrderData;
    // const navigate =useNavigate()
    useEffect(()=>{
      setPurchaseOrdersBtn(true)
    },[])
    return (
    <div style={{minHeight:'100vh'}}>
{purchaseOrderBtn && (
        <Link to="/ordermanagement/purchaseorder">
          <button>Purchase Order</button>
        </Link>
      )}
<Outlet/>
    </div>
  );
};

export default OrderManagement;
