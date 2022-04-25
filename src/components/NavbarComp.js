import React from 'react';
import {withAuthenticator} from '@aws-amplify/ui-react';
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Play from "../pages/playMaker";
import View from "../pages/ViewPlays";


function NavbarComp({signOut}) {
    /*navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0*/

    return (
        <Router>
            <div
                class='"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark border-bottom box-shadow"'>
                <Navbar bg="navbar navbar-dark bg-success" expand="lg">
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
                                <Nav.Link as={Link} to={"/playMaker"}>Create</Nav.Link>
                                <Nav.Link as={Link} to={"/viewPlays"}>View Plays</Nav.Link>
                            </Nav>

                            <Button class="btn btn-success btn-lg" onClick={signOut}>Sign out</Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/playMaker" element={<Play/>}/>
                    <Route path="/ViewPlays" element={<View/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default withAuthenticator(NavbarComp);