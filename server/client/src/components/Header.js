import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to='/'>YMDB</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1}>
                        <Link to='/add/review'>Add Review</Link>
                    </NavItem>
                    <NavItem eventKey={2}>
                        <Link to='/add/movie'>Add Movie</Link>
                    </NavItem>
                    <NavItem eventKey={3}>
                        <Link to='/Search'>Search</Link>
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default Header;

                // <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                //     <MenuItem eventKey={3.1}>Action</MenuItem>
                //     <MenuItem eventKey={3.2}>Another action</MenuItem>
                //     <MenuItem eventKey={3.3}>Something else here</MenuItem>
                //     <MenuItem divider />
                //     <MenuItem eventKey={3.3}>Separated link</MenuItem>
                // </NavDropdown>