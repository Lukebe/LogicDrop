import React from 'react';
import { Nav, Navbar, TabContainer } from 'react-bootstrap';
import LogicDropLogo from '../assets/logicdrop_logo.png';


export class NavComponent extends React.Component{
    render() {
        return (
            <Navbar className="navbar" variant="dark">
                <TabContainer>
                    <Navbar.Brand href="/home">
                        <img className="logicdrop_logo" src={LogicDropLogo} alt="logicdrop" />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/poke" className="nav-link">Poke Finder</Nav.Link>
                        <Nav.Link href="/click" className="nav-link ">Click</Nav.Link>
                        <Nav.Link href="/pokelist" className="nav-link ">Poke List</Nav.Link>
                    </Nav>
                </TabContainer>
            </Navbar>
        );
    }
}

export default NavComponent;
