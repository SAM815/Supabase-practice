import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ProductCard from './productCard';
import { supabase } from './supabaseClient';


//How we're going to approach this project
//1) Create the user interface (Navbar, form to create products, product card)
//2) Setup supabase, create a table for our products
//Implement the CRUD logic for the products



//Inorder to give our react application access to name and description
//we have to create states to capture the value of whatever the user has entered



//whenever we load the page we are fetching data from the supabase
//using useEffect


function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  



  console.log(name);
  console.log(description);



  //takes two parameters, 1st one is the logic we want to implement, 2nd one
  //dependency array i.e. if any value inside the array change
  //run the effect again
  //empty mean we want to run it only once
  useEffect(() => {
    getProducts();
  }, []);


  //async function because we are waiting for database call/api call
  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*") //select all the data from the products table but the limit is 10
        .limit(10);
      if (error) throw error;
      //supabase can return null thus
      if (data != null) {
        setProducts(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function createProduct() {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          name: name,
          description: description
        })
        .single() //because we only want to insert one product at the end

      if (error) throw error;
      window.location.reload();

    } catch (error) {
      alert(error.message);
    }
  }
  console.log(products);
  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand> Store Products</Navbar.Brand>
          <Nav>
            <Nav.Item>Created by Samman Bhetwal</Nav.Item>
          </Nav>
        </Container>
      </Navbar>
     


      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h3>Create Product For Supabase Database</h3>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              id="name"
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <Button onClick={() => createProduct()}> Create Product in Supabase</Button>
          </Col>

        </Row>
        <hr />
        <h3>Current Database Items</h3>
        <br />
        <Row x={1} lg={3} className="g-4">
          {products.length === 0 ? "No Database Items to display" :
            products.map((product) => (
              <Col>
                <ProductCard product={product} />
              </Col>
            ))}


        </Row>
      </Container>





    </div>

  );
}

export default App;
