import React, { useEffect } from "react";
import Steps from "../components/Steps";
import { Helmet } from "react-helmet-async";
import { Card, Col, Row, Form, ListGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import { orderplaced } from "../Action/OrderPlaceAction";
import { toast } from "react-toastify";
import axios from "axios";
import { CART_CLEAR_ITEMS } from "../Action/CartAction";

function PlaceOrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.address);
  const { cartItems } = useSelector((state) => state.cart);
  const cartIength = cartItems.length;
  const { user } = useSelector((state) => state.user);
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const shippingPrice = itemsPrice > 100 ? round2(0) : round2(10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const paymentMethod = shippingAddress.paymentMethod;

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    const orderData = {
      shippingAddress,
      paymentMethod,
      orderItems: cartItems,
      user: {
        _id: user._id,
        email: user.email,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      },
    };
    try {
      const response = await axios.post("/api/user/orderplace", orderData);
      console.log(response.data.createdOrder._id);
      if (response.data.createdOrder._id) {
        dispatch({ type: CART_CLEAR_ITEMS });
        localStorage.removeItem("cartItems");
        toast.success("Order placed successfully.Go more shopping");
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent("/cart")}`);
    }
    if (!shippingAddress.paymentMethod && cartIength === 0) {
      navigate("/");
    }
  }, [shippingAddress, navigate]);
  return (
    <div>
      <Steps step1 step2 step3 step4></Steps>
      <Helmet>
        <title>Place Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3 p-3">
            <Card className="mb-2">
              <Card.Body>
                <Card.Title>Shipping</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {shippingAddress.fullName} <br />
                  <strong>Address:</strong> {shippingAddress.address},{" "}
                  {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                  {shippingAddress.country}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mt-2">
              <Card.Body>
                <Card.Title>Payment Method</Card.Title>
                <Card.Text>
                  <Form>
                    <Form.Check
                      type="radio"
                      label={shippingAddress.paymentMethod}
                      id="paypal"
                      name="paymentMethod"
                      value="PayPal"
                      checked
                    />
                  </Form>
                </Card.Text>
              </Card.Body>

              {/* Containing div for the "Edit" button */}
              <div className="edit-button-container">
                <Link to="/shipping">
                  <Button>Edit</Button>
                </Link>
              </div>
            </Card>
          </Card>
          <ListGroup className=" mt-4">
            {cartItems.map((item) => (
              <ListGroup.Item>
                <Row key={item._id} className="align-items-center">
                  <Col md={4}>
                    <img
                      src={item.image}
                      alt=""
                      className="img-fluid rounded img-thumbnail"
                    />
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                  </Col>

                  <Col md={4} className="d-flex justify-content-center">
                    <ListGroup.Item>
                      <span>Quantity:{item.quantity}</span>
                    </ListGroup.Item>
                  </Col>
                  <Col
                    md={4}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <ListGroup.Item>
                      <span>Price:${item.price}</span>
                    </ListGroup.Item>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <div className="edit-button-container">
              <Link to="/cart">
                <Button>Edit</Button>
              </Link>
            </div>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items price</Col>
                    <Col>${itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>${totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cartItems.length === 0}
                    >
                      Place order
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
