import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../Action/AddressAction";
import { useNavigate } from "react-router-dom";
import Steps from "../components/Steps";
import { getError } from "../utils";
import { toast } from "react-toastify";

export default function ShippingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const useremail = user ? user.email : null;
  const { shippingAddress } = useSelector((state) => state.address);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [PaymentMethodName, setPaymentMethodeName] = useState("");

  useEffect(() => {
    if (shippingAddress) {
      setFullName(shippingAddress.fullName);
      setAddress(shippingAddress.address);
      setCity(shippingAddress.city);
      setCountry(shippingAddress.country);
      setPostalCode(shippingAddress.postalCode);
      setPaymentMethodeName(shippingAddress.paymentMethod);
    }

    if (!useremail) {
      navigate(`/login?redirect=${encodeURIComponent("/cart")}`);
    }
  }, [shippingAddress, navigate, useremail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const shippingAddressData = {
      fullName,
      address,
      city,
      country,
      postalCode,
      paymentMethod: PaymentMethodName,
    };
    if (PaymentMethodName) {
      dispatch(saveShippingAddress(shippingAddressData));
      navigate("/placeorder");
    } else {
      const errorMessage = "Need to select PaymentMethod";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <Steps step1={true} step2={true} />
      <div className="container small-container">
        <h1 className=" my-3">Shipping Address</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Form.Check
              type="radio"
              label="PayPal"
              id="radio"
              value="PayPal"
              checked={PaymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethodeName(e.target.value)}
              required
            ></Form.Check>
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={PaymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethodeName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
