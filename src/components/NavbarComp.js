import React from 'react';
import {withAuthenticator} from '@aws-amplify/ui-react';
import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Play from "../pages/playMaker";


function NavbarComp({signOut}) {


    return (
        <Router>
            <div>
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll"/>
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{maxHeight: '100px'}}
                                navbarScroll
                            >
                                <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                                <Nav.Link as={Link} to={"/playMaker"}>Make a play</Nav.Link>
                                <NavDropdown title="Link" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#" disabled>
                                    Link
                                </Nav.Link>
                            </Nav>

                            <button onClick={signOut}>Sign out</button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/playMaker" element={<Play/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default withAuthenticator(NavbarComp);