import React from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {GiBasketballBasket} from "react-icons/gi";


import {withAuthenticator} from '@aws-amplify/ui-react';

function NavbarComp({signOut}) {
    return (
        <div data-testid='navbar'
             class='"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark border-bottom box-shadow"'>
            <Navbar bg="navbar navbar-dark bg-success" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#"><GiBasketballBasket size={70}/> Playbook </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                            navbarScroll
                        >
                            <Nav.Link as={Link} to={"/"}>Create</Nav.Link>
                            <Nav.Link as={Link} to={"/viewPlays"}>View Plays</Nav.Link>
                        </Nav>
                        <Button class="btn btn-success btn-lg" onClick={signOut}>Sign out</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
export default withAuthenticator(NavbarComp);