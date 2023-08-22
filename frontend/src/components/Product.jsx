import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Action/CartAction";
import { toast } from "react-toastify";
function Product(props) {
  const dispatch = useDispatch();
  const { product } = props;
  const { cartItems } = useSelector((state) => state.cart);
  const productexist = cartItems.find((items) => items.slug === product.slug);
  const quantity = productexist ? productexist.quantity : 0;
  const handleAddToCart = () => {
    if (quantity === product.countInStock) {
      toast.error(" product is outofstock");
    } else {
      dispatch(addToCart(product));
    }
  };
  return (
    <Card key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt="" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>{product.price}</Card.Text>
        {quantity === product.countInStock ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={handleAddToCart}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
