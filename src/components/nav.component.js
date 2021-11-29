import React from 'react';
import LogicDropLogo from '../assets/logicdrop_logo.png';
import { Container, Navbar, NavbarBrand, NavbarToggler, NavLink } from 'reactstrap';

export class NavComponent extends React.Component{
    render() {
        return (
            <Navbar className="navbar navbar-toggleable-md navbar-expand-lg navbar-dark bg-dark display-front nav-pad">
                <Container className="navbar-header c-pointer shift-left">
                    <NavbarBrand href="/home">
                        <img className="logicdrop_logo" src={LogicDropLogo} alt="logicdrop" />
                    </NavbarBrand>
                    <NavLink href="/poke" className="nav-link">Poke Finder</NavLink>
                    <NavLink href="/click" className="nav-link ">Click</NavLink>
                    <NavLink href="/pokelist" className="nav-link ">Poke List</NavLink>
                </Container>
            </Navbar>
        );
    }
}

export default NavComponent;
