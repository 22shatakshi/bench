import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { DropdownSubmenu } from "react-bootstrap-submenu"; // install
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'

import "react-bootstrap-submenu/dist/index.css";

const NavbarComp = () => {
  const { user, logout, deleteAccount } = useAuth()
  const router = useRouter()

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>Bench</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
              <Nav.Link href="/dashboard">Explore</Nav.Link>
                <Nav.Link href="/myProfile">My Profile</Nav.Link>
                <NavDropdown title="Settings" id="collapseble submenu">
                  <DropdownSubmenu href="#action/2.1" title="Manage Account">
                    <NavDropdown.Item href="/updatePassword">
                      Update Password
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/updateEmail">
                        Update Email
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => {
                      deleteAccount()
                      router.push('/login')
                    }}
                    >
                      Delete Account
                    </NavDropdown.Item>
                  </DropdownSubmenu>
                </NavDropdown>
                <Nav.Link
                  onClick={() => {
                    logout()
                    router.push('/login')
                  }}
                >
                  Logout
                </Nav.Link>
              </>                  
            ) : (
              <>
                <Link href="/signup" passHref>
                  <Nav.Link>Signup</Nav.Link>
                </Link>
                <Link href="/login" passHref>
                  <Nav.Link>Login</Nav.Link>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComp