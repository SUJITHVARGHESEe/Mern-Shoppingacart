import axios from "axios";
import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("/api/products/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);
  const handleCategoryClick = (category) => {
    toggleSidebar();
    navigate(`/search?category=${encodeURIComponent(category)}`);
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={toggleSidebar}>
        <i className="fas fa-times"></i>
      </button>
      <Nav className=" d-flex flex-column text-white w-100 p-2">
        <Nav.Item>
          <strong>Categories</strong>
        </Nav.Item>
        {categories.map((category) => (
          <Nav.Item key={category}>
            <Nav.Link onClick={() => handleCategoryClick(category)}>
              {category}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}

export default Sidebar;
