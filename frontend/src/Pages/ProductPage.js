import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Card, Badge, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Action/ProductAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { addToCart } from "../Action/CartAction";
import { toast } from "react-toastify";

function ProductPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, slug]);
  const { cartItems } = useSelector((state) => state.cart);
  const cartItem = cartItems.find((item) => item.slug === slug);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const product = products.find((product) => product.slug === slug);

  const handleAddToCart = async () => {
    try {
      if (cartQuantity === product.countInStock) {
        toast.error("currently the product is out of stock");
      } else {
        dispatch(addToCart(product));
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product not found</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <div>
            <img src={product.image} className="img-large" alt="" />
          </div>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>
              Description
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>status</Col>
                    <Col>
                      {cartQuantity === product.countInStock ? (
                        <Badge bg="danger">Outof Stock</Badge>
                      ) : (
                        <Badge bg="success">In stock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup>
                  {cartQuantity === product.countInStock ? (
                    <Button variant="danger" disabled>
                      Out of Stock
                    </Button>
                  ) : (
                    <Button onClick={handleAddToCart}>Add to Cart</Button>
                  )}
                </ListGroup>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div>
        <p>heree my id {product._id}</p>
      </div>
    </div>
  ); // Display the product name if the product is found
}

export default ProductPage;
