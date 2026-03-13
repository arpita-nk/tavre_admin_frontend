import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import '../../styles/sidebarmenu.css'
import { IoNotifications } from 'react-icons/io5'
import { FaUser } from 'react-icons/fa'

const navbarItems = [
  {
    name: 'Dashboard',
    link: '/dashboard'
  },
  {
    name: 'Products',
    link: '/products'
  },
  {
    name: 'Inventory',
    link: '/inventory'
  },
  {
    name: 'Orders',
    link: '/orders'
  },
  {
    name: 'Customers',
    link: '/customers'
  }
  // {
  //   name: 'Analytics',
  //   link: '#analytics'
  // },
  // {
  //   name: 'Settings',
  //   link: '#settings'
  // }
]

const SidebarMenu = () => {
  return (
    <Navbar expand="lg" className="sidebar-menu">
      <Container fluid className="sidebar-container">
        <Navbar.Brand href="#home" className="brand-section">
          <div className="brand-icon">
            <img
              alt="Tavré Logo"
              src="/src/assets/Logo-icon.png"
              width="60"
              height="60"
            />
          </div>
          <span className="brand-text">TAVRÉ</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-links">
            {navbarItems.map((item, index) => (
              <Nav.Link key={index} href={item.link} className="nav-item-link">
                {item.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
        <div className="navbar-right">
          {/* <button className="icon-button theme-toggle">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="4" fill="#d4a24c" />
              <path
                d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34"
                stroke="#d4a24c"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button> */}
          {/* <button className="icon-button notifications">
            <IoNotifications color="#d4a24c" size={22} />
            <span className="notification-badge">1</span>
          </button> */}
          <div className="user-profile">
            <div className="user-info">
              <span className="user-name">ALEXANDER T.</span>
              <span className="user-role">Administrator</span>
            </div>
            <div className="user-avatar">
              <FaUser color="#d4a24c" size={26} />
              <span className="online-indicator"></span>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  )
}

export default SidebarMenu
