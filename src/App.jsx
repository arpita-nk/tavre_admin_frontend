import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './component/pages/Login'
import AdminLayout from './component/Layouts/AdminLayout'
import Dashboard from './component/pages/Dashboard'
import Inventory from './component/pages/Inventory'
import Orders from './component/pages/Orders'
import Customers from './component/pages/Customers'
import Products from './component/pages/Products'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/products"
          element={
            <AdminLayout>
              <Products />
            </AdminLayout>
          }
        />

        <Route
          path="/inventory"
          element={
            <AdminLayout>
              <Inventory />
            </AdminLayout>
          }
        />

        <Route
          path="/orders"
          element={
            <AdminLayout>
              <Orders />
            </AdminLayout>
          }
        />

        <Route
          path="/customers"
          element={
            <AdminLayout>
              <Customers />
            </AdminLayout>
          }
        />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
