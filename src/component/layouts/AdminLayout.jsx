import React from 'react'
import SidebarMenu from './SidebarMenu'
import '../../App.css'
import { Container } from 'react-bootstrap'

const AdminLayout = ({ children }) => {
  return (
    <>
      <SidebarMenu />
      <div className="main-content">{children}</div>
    </>
  )
}
export default AdminLayout
