import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";

import React,{useState} from "react";

function Header() {
  const [keyword, setKeyword] = useState("");

  const formHandler = (e) => {
    const history = useLocation()
    e.preventDefault();
    if (keyword.trim()) {
      history.pushState(`/search/${keyword}`);
    } else {
      history.pushState('/')
    }
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
          {/* <Router>
            <Routes>
              <Route path="/">
                <Route
                 path="/search" render={({ history }) => <Search history={history} />}
                />
              </Route>
            </Routes>
          </Router> */}

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
