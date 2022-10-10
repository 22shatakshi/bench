import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'

const NavbarComp = () => {
  const { user, logout } = useAuth()
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
                <Nav.Link href="/My Profile">My Profile</Nav.Link>
                <NavDropdown title="Manage Account" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/updatePassword">
                      Update Password
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/updateEmail">
                      Update Email
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                      Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/deleteAccount">
                      Delete Account
                  </NavDropdown.Item>
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
