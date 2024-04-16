import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { usePurchaseOrders } from '../PurchaseOrderContext'

const InventoryMangement = () => {
  const ContexData=usePurchaseOrders();
  const {showInventoryBtn,setShowInventoryBtn}=ContexData;
  useEffect(()=>{
    setShowInventoryBtn(true)
  },[])
  return (
    <div>
      {showInventoryBtn&&(
<Link to='/inventorymangement/inventoryitems'>
<button  className='btn btn-primary'>Inventory Items</button>
</Link>
      )}
<Outlet/>
    </div>
  )
}

export default InventoryMangement