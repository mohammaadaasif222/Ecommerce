import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";


import { addKeyword } from "../../redux//features/getAllProductsSlice";

import React, { useState } from "react";

function Header() {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch()

  const {authenticate} = useSelector((state)=> state.User)
  console.log(authenticate);
  const formHandler = (e) => {
    e.preventDefault()
    dispatch(addKeyword(keyword))
  };

  return (
    <Navbar className="border p-3 nav-fix" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">MOHAMMAD</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="signup">Sign Up</Nav.Link>
            <Nav.Link href="signin">Sign In</Nav.Link>
          </Nav>
          {/* <Route render={({ history }) => <Search history={history} />} /> */}

          <Form
            className="d-flex "
            style={{ width: "60%" }}
            onSubmit={formHandler}
          >
            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-2 "
              aria-label="Search"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="btn btn-primary">Search</button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
