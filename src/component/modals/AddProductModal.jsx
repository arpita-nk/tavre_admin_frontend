import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import NewProductForm from '../forms/NewProductForm'

const AddProductModal = (props) => {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="add-apparel-modal-title"
      centered
      contentClassName="add-apparel-modal-content"
      backdrop="static"
    >
      <div className="import-modal-header">
        <div>
          <h2 className="headerTitle">Add New Products</h2>
        </div>
      </div>
      <Modal.Body className="import-modal-body">
        <NewProductForm />
      </Modal.Body>
      <Modal.Footer className="import-modal-footer">
        <Button variant="link" className="cancel-btn">
          CANCEL
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddProductModal
