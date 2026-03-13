import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'

const Customers = () => {
  return (
    <Container fluid className="inventory-container">
      <Row className="align-items-center mb-4">
        <Col>
          <div className="inventory_header">
            <h2>Customers</h2>
          </div>
        </Col>
        <Col xs="auto" className="d-flex gap-3 align-items-center"></Col>
      </Row>
    </Container>
  )
}

export default Customers
