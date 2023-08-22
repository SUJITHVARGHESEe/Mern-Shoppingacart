import React from "react";
import { Row, Col } from "react-bootstrap";

function Steps({ step1, step2, step3, step4 }) {
  return (
    <div>
      <Row className="checkout-steps">
        <Col className={step1 ? "active" : ""}>Sign-In</Col>
        <Col className={step2 ? "active" : ""}>AddToCart</Col>
        <Col className={step3 ? "active" : ""}>Shipping and PaymentMethod</Col>
        <Col className={step4 ? "active" : ""}>Place Order</Col>
      </Row>
    </div>
  );
}

export default Steps;
