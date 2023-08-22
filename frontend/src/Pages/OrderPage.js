import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup } from "react-bootstrap";
import { fetchOrders } from "../Action/OrderPlaceAction";
import { Link, useNavigate } from "react-router-dom";

function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.orders);
  const userId = user ? user._id : null;

  useEffect(() => {
    // Check if the user is not logged in or signed up
    if (!user) {
      // Redirect to the login page with the intended redirection to "/orders"
      navigate(`/login?redirect=${encodeURIComponent("/orders")}`);
    }

    // Fetch orders if the user is logged in
    dispatch(fetchOrders(userId));
  }, [dispatch, navigate, userId, user]);

  return (
    <div>
      <h5>Order History</h5>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p>{error}</p>
      ) : orders.length === 0 ? ( // Check if user has no orders
        <div className="center-message">
          <h2>{`Hi ${user.name} `} </h2> <h6>you don't have any orders yet</h6>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <ListGroup key={order._id}>
              <h6 className="orderPage">Order ID: {order._id}</h6>
              <ListGroup.Item>
                <Row>
                  <Col md={5} className="productdetails">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="product-details text-center">
                        <img
                          src={item.image}
                          alt=""
                          className="img-fluid rounded img-thumbnail mr-2"
                          style={{ width: "50px", height: "50px" }}
                        />
                        <Link to={`/product/${item.slug}`}>
                          <h6 className="product-name">{item.name}</h6>
                        </Link>
                        <span className="product-name">
                          <strong> Quantity:</strong> {item.quantity}
                        </span>
                        <span className="product-name">
                          Price: ${item.price}
                        </span>
                      </div>
                    ))}
                  </Col>
                  <Col md={2} className="d-flex flex-column">
                    <div className="product-name1">
                      <strong className="nameadjust">Name:</strong>{" "}
                      {order.shippingAddress.fullName}
                    </div>
                    <div className="product-name1">
                      <strong>Address:</strong> {order.shippingAddress.address},
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.country},
                      {order.shippingAddress.postalCode}
                    </div>
                  </Col>
                  <Col md={2} className="d-flex flex-column">
                    <div className="product-name1">
                      <strong>Payment Method:</strong> {order.paymentMethod}
                    </div>
                    <div className="product-name1">
                      <strong>Total Price:</strong> $ {order.totalPrice}
                    </div>
                  </Col>
                  <Col md={3} className="d-flex flex-column">
                    <div className="product-name1">
                      <strong>Payment Status:</strong> Not paid
                    </div>
                    <div className="product-name1">
                      <strong>Order Status:</strong> Not Delivered!
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
              <hr className="mt-5" />
            </ListGroup>
          ))}
        </div>
      )}
    </div>
  );
}
export default OrderPage;
