import React, { useState } from "react";
import { usePurchaseOrders } from "./PurchaseOrderContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const PurchaseOrderTable = () => {
  const purchaseOrderData = usePurchaseOrders();
  const {
    purchaseOrders,
    handleEdit,
    handleDelete,
    purchaseOrderBtn,
    setPurchaseOrdersBtn,
    viewBtn,
    setView,
    addBtn,
    setAddBtn,
  } = purchaseOrderData;

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const filteredOrders = purchaseOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery) ||
      order.itemName.toLowerCase().includes(searchQuery) ||
      order.supplier.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="purchaseOrderTableData">
      <div className="addbtnTable">
        <input
          type="search"
          className="form-control w-25 mb-3"
          placeholder="Search by ID, Item Name, or Supplier..."
          autoFocus
          value={searchQuery}
          onChange={handleSearch}
        />
        <Link to="/ordermanagement/purchaseorderformm">
          <button className="btn btn-success">Add</button>
        </Link>
      </div>
      <Card>
        <Card.Body>
          <Table striped bordered hover style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Id</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.id}</td>
                    <td>{order.itemName}</td>
                    <td>{order.quantity}</td>
                    <td>{order.supplier}</td>
                    <td>{order.status}</td>
                    <td>
                      {/* <Link to={`/purchaseorderupdateform/${order.id}`}>
                        <Button variant="primary" className="mx-1 ">
                          <FontAwesomeIcon icon={faPencil} />
                        </Button>
                      </Link> */}
                      <Button
                        variant="primary"
                        className="mx-1 "
                        onClick={() => {
                          handleEdit(order.id)
                          navigate("/ordermanagement/purchaseorderformm")
                        }}
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(order.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No matching orders found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PurchaseOrderTable;
