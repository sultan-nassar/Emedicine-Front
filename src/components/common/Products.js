
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../Utility/constants";
import moment from "moment";
import "./Products.css";
import Header from "../common/Header";
import Footer from "./Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name_asc");
  const [isLoading, setIsLoading] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}api/Admin/getMedicines?id=0`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data && response.data.listMedicines) {
        setProducts(response.data.listMedicines);
        setFilteredProducts(response.data.listMedicines); // Set filteredProducts initially
      } else {
        console.error("No products found in API response");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, sortOrder, products]);

  const filterProducts = () => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOrder) {
      case "name_asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price_asc":
        filtered.sort((a, b) => a.unitPrice - b.unitPrice);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.unitPrice - a.unitPrice);
        break;
      default:
        break;
    }

    isLoading === 0
      ? setFilteredProducts(products)
      : setFilteredProducts(filtered);
  };

  const handleAddToCart = async (product) => {
    const cartItem = {
      id: 0,
      productId: product.id,
      quantity: 1, // Default quantity to 1 for adding to cart
      userId: localStorage.getItem("userID"),
    };

    try {
      const response = await axios.post(
        `${baseUrl}api/Medicines/addToCart`,
        cartItem,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          },
        }
      );
      if (response.data && response.data.statusCode === 200) {
        toast.success("Item added to cart successfully!");
      } else {
        toast.error("Error adding item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Error adding item to cart");
    }
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setIsLoading(1);
  };
  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
    setIsLoading(1);
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2>Products</h2>
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group controlId="searchTerm">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by product name"
                  value={searchTerm}
                  onChange={(e) => handleSearchTerm(e)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="sortOrder">
                <Form.Label>Sort By</Form.Label>
                <Form.Control
                  as="select"
                  value={sortOrder}
                  onChange={(e) => handleSortOrder(e)}
                >
                  <option value="name_asc">Name: A-Z</option>
                  <option value="name_desc">Name: Z-A</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <br/>
        </Form>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Row className="product-grid">
            {filteredProducts.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={3} className="mb-4">
                <Card className="product-card h-100">
                  <Card.Img
                    variant="top"
                    src={product.imageUrl}
                    className="product-image"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="flex-grow-1">
                      <strong>Manufacturer:</strong> {product.manufacturer}
                      <br />
                      <strong>Price:</strong> ${product.unitPrice}
                      <br />
                      <strong>Discount:</strong> {product.discount}%<br />
                      <strong>Expiry Date:</strong>{" "}
                      {moment(
                        product.expDate,
                        "YYYY-MM-DD HH:mm:ss.SSS"
                      ).format("MMMM DD, YYYY")}
                    </Card.Text>
                    {localStorage.getItem("Role") === "Users" ? (
                      <Button
                        variant="primary"
                        onClick={() => handleAddToCart(product)}
                        className="mt-auto align-self-center"
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      ""
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <br/><br/>
      <br/><br/>
      <br/><br/>

      <Footer />
    </>
  );
};

export default Products;
