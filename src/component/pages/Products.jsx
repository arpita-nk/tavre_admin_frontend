import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'

import '../../styles/inventory.css'
import AddProductModal from '../modals/AddProductModal'

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddProductModal, setShowAddProductModal] = useState(false)

  return (
    <Container fluid className="product-container">
      <Row className="align-items-center mb-4">
        <Col>
          <div className="inventory_header">
            <h2>PRODUCTS</h2>
            <h5>List of Products</h5>
          </div>
        </Col>
        <Col xs="auto" className="d-flex gap-3 align-items-center">
          <div className="search-box">
            <Form.Control
              type="text"
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <Button
            className="add-product-btn"
            onClick={() => setShowAddProductModal(true)}
          >
            <FaPlus className="me-2" />
            ADD NEW PRODUCT
          </Button>
        </Col>
      </Row>
      <AddProductModal
        show={showAddProductModal}
        onHide={() => setShowAddProductModal(false)}
      />
    </Container>
  )
}

export default Products
