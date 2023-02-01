import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import { PropTypes } from "prop-types";


export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar className="navbar" expand="lg">
            <Container>
                <Navbar.Brand className="nav-Title" as={Link} to="/">
                    Mirror Stage
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="nav-text" id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

NavigationBar.PropTypes = {
    user: PropTypes.object.isRequired,
    onLoggedOut: PropTypes.func.isRequired
}