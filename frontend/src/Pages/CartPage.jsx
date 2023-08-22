import React from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import MessageBox from "../components/MessageBox";
import { Link, useNavigate } from "react-router-dom";
import { removeProduct, updateQuantity } from "../Action/CartQuantityAction";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const handleQuantity = (item, newQuantity) => {
    dispatch(updateQuantity(item, newQuantity));
  };
  const user = useSelector((state) => state.user);
  const handleRemoveFromCart = (item) => {
    dispatch(removeProduct(item));
  };
  const handleCheckout = () => {
    if (user.name && user.email) {
      navigate("/shipping");
    } else {
      navigate(`/login?redirect=${encodeURIComponent("/shipping")}`);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h3>Shopping cart</h3>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty <Link to={"/"}>GO shopping </Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt=""
                        className="img-fluid rounded img-thumbnail"
                      />
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() => handleQuantity(item, item.quantity - 1)}
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        onClick={() => handleQuantity(item, item.quantity + 1)}
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle" oncl></i>
                      </Button>
                    </Col>
                    <Col md={3}>{item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => handleRemoveFromCart(item)}
                        variant="light"
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        {cartItems.length !== 0 && (
          <Col md={4}>
            <ListGroup className="totalPrice">
              <ListGroup.Item>
                <span>Total Quantity: </span>
                {cartItems.reduce((a, c) => a + c.quantity, 0)}
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Total Price: $</span>
                {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button className="btn-primary" onClick={handleCheckout}>
                  Procced to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default CartPage;
