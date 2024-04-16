import React, { useEffect } from 'react'
import { usePurchaseOrders } from '../PurchaseOrderContext'
import { Link } from 'react-router-dom';

const InventoryItem = () => {
  const ContextData=usePurchaseOrders();
  const {showInventoryBtn, setShowInventoryBtn}=ContextData;
  useEffect(()=>{
    setShowInventoryBtn(false);
  },[])
  return (
    <div>Inventory items
      <Link><button className='btn btn-primary'>Add+</button></Link>
      <Link><button className='btn btn-primary'>view</button></Link>
      <Link><button className='btn btn-success'>Edit</button></Link>
      <Link><button className='btn btn-danger'>Delete -</button></Link>
    </div>
  )
}

export default InventoryItem