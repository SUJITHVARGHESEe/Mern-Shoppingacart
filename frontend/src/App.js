import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Navbar, Container, Badge, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";
import ShippingPage from "./Pages/ShippingPage";
import PlaceOrderScreen from "./Pages/PlaceOrderScreen";
import OrderPage from "./Pages/OrderPage";
import UserProfilePage from "./Pages/UserProfilePage";
import Sidebar from "./components/Sidebar";
import { logout } from "./Action/UserAction";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./Pages/SearchPage.jsx";

function App() {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <div
        className={`App site-container ${sidebarIsOpen ? "sidebar-open" : ""}`}
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>
              <SearchBox />
              <LinkContainer to={"/cart"}>
                <Navbar.Text>
                  <span className="mr-2">Cart</span>
                  <Badge variant="info">{totalQuantity}</Badge>
                </Navbar.Text>
              </LinkContainer>
              {user ? (
                <NavDropdown
                  title={
                    <span style={{ color: "white" }}>{`Hi, ${user.name}`}</span>
                  }
                  id="profile-dropdown"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer to="/orders">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown
                  title={<span style={{ color: "white" }}>Account</span>}
                  id="profile-dropdown"
                >
                  <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                </NavDropdown>
              )}
            </Container>
          </Navbar>
        </header>

        <Sidebar
          isOpen={sidebarIsOpen}
          toggleSidebar={() => setSidebarIsOpen(!sidebarIsOpen)}
        />

        <main className="main-content">
          <Container>
            <Routes>
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/search" element={<SearchScreen />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
