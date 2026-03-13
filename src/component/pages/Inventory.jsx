import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import '../../styles/inventory.css'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { CiImport } from 'react-icons/ci'
import ImportModal from '../Modals/importModal'

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddProduct = () => {
    console.log('Add new product')
  }

  return (
    <Container fluid className="inventory-container">
      <Row className="align-items-center mb-4">
        <Col>
          <div className="inventory_header">
            <h2>APPAREL INVENTORY</h2>
            <h5>Stock Control & Master Catalog</h5>
          </div>
        </Col>
        <Col xs="auto" className="d-flex gap-3 align-items-center">
          <div className="search-box">
            <Form.Control
              type="text"
              placeholder="Search apparel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <Button className="add-product-btn" onClick={handleAddProduct}>
            <FaPlus className="me-2" />
            ADD NEW PRODUCT
          </Button>
          {/* <Button className="import-product-btn" onClick={handleImport}>
            <CiImport size={20} className="me-2" />
            Import
          </Button> */}
        </Col>
      </Row>

      {/* Import Modal */}
      {/* <ImportModal
        show={showImportModal}
        onHide={() => setShowImportModal(false)}
      /> */}
    </Container>
  )
}

export default Inventory
