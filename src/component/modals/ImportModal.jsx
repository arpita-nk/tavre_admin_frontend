import React, { useState, useRef } from 'react'
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap'
import {
  FaTimes,
  FaCloudUploadAlt,
  FaDownload,
  FaTable,
  FaImage,
  FaHistory,
  FaFile,
  FaBarcode,
  FaDollarSign,
  FaBoxes,
  FaCheckCircle
} from 'react-icons/fa'
import { BsArrowRight } from 'react-icons/bs'
import '../../styles/importModal.css'

function ImportModal(props) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [csvData, setCsvData] = useState([])
  const [csvHeaders, setCsvHeaders] = useState([])
  const [columnMapping, setColumnMapping] = useState({})
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const fileInputRef = useRef(null)

  // Database fields for mapping
  const databaseFields = [
    { value: 'productName', label: 'Product Name' },
    { value: 'size', label: 'Size' },
    { value: 'price', label: 'Price' },
    { value: 'productCode', label: 'Product Code' },
    { value: 'productType', label: 'Product Type' },
    { value: 'color', label: 'Color' },
    { value: 'HSN', label: 'HSN' },
    { value: 'barcode', label: 'Barcode' }
  ]

  const parseCSV = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target.result
      const lines = text.split('\n').filter((line) => line.trim())

      if (lines.length > 0) {
        // Parse headers
        const headers = lines[0].split(',').map((h) => h.trim())
        setCsvHeaders(headers)

        // Parse first 3 rows of data
        const dataRows = lines.slice(1, 4).map((line) => {
          const values = line.split(',').map((v) => v.trim())
          const row = {}
          headers.forEach((header, index) => {
            row[header] = values[index] || ''
          })
          return row
        })
        setCsvData(dataRows)

        // Auto-detect column mappings
        const autoMapping = {}
        headers.forEach((header) => {
          const headerLower = header.toLowerCase()
          if (headerLower.includes('product') && headerLower.includes('name')) {
            autoMapping[header] = 'productName'
          } else if (headerLower === 'productname') {
            autoMapping[header] = 'productName'
          } else if (
            headerLower.includes('sku') ||
            headerLower.includes('barcode')
          ) {
            autoMapping[header] = 'barcode'
          } else if (headerLower.includes('price')) {
            autoMapping[header] = 'price'
          } else if (headerLower === 'size') {
            autoMapping[header] = 'size'
          } else if (
            headerLower.includes('color') ||
            headerLower.includes('colour') ||
            headerLower === 'colur'
          ) {
            autoMapping[header] = 'color'
          } else if (
            headerLower.includes('type') ||
            headerLower === 'producttype'
          ) {
            autoMapping[header] = 'productType'
          } else if (
            headerLower.includes('code') ||
            headerLower === 'productcode'
          ) {
            autoMapping[header] = 'productCode'
          } else if (headerLower.includes('hsn') || headerLower === 'hsn') {
            autoMapping[header] = 'HSN'
          }
        })
        setColumnMapping(autoMapping)
      }
    }
    reader.readAsText(file)
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      parseCSV(file)
      setUploadError(null)
      setCurrentStep(2)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
      parseCSV(file)
      setUploadError(null)
      setCurrentStep(2)
    }
  }

  const handleChooseFile = () => {
    fileInputRef.current.click()
  }

  const handleDownloadTemplate = () => {
    // Create a sample CSV template
    const headers =
      'productName,size,price,productCode,productType,color,HSN,barcode\n'
    const sample = 'Sample Product,M,599,1001,T-Shirt,Blue,6109,SAMPLE-001'
    const csvContent = headers + sample

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'product_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleCancel = () => {
    setCurrentStep(1)
    setSelectedFile(null)
    setCsvData([])
    setCsvHeaders([])
    setColumnMapping({})
    setUploadResult(null)
    setUploadError(null)
    setIsUploading(false)
    props.onHide()
  }

  const handleMappingChange = (fileColumn, dbField) => {
    setColumnMapping((prev) => ({
      ...prev,
      [fileColumn]: dbField
    }))
  }

  const handleVerifyData = () => {
    // Validate that all required fields are mapped
    const requiredFields = ['productName', 'price']
    const mappedFields = Object.values(columnMapping)

    const missingFields = requiredFields.filter(
      (field) => !mappedFields.includes(field)
    )

    if (missingFields.length > 0) {
      setUploadError(
        `Please map the following required fields: ${missingFields.join(', ')}`
      )
      return
    }

    // Proceed to upload
    handleConfirmImport()
  }

  // Upload CSV to Backend
  const handleConfirmImport = async () => {
    setIsUploading(true)
    setUploadError(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('mappings', JSON.stringify(columnMapping))

      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setUploadResult(data)
        setCurrentStep(3) // Show success screen
      } else {
        setUploadError(data.message || 'Upload failed. Please try again.')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError(
        'Failed to connect to server. Please ensure the backend is running on http://localhost:8080'
      )
    } finally {
      setIsUploading(false)
    }
  }

  const getIconForColumn = (columnName) => {
    const name = columnName.toLowerCase()
    if (name.includes('product') || name.includes('name')) return <FaFile />
    if (name.includes('sku') || name.includes('barcode')) return <FaBarcode />
    if (name.includes('price')) return <FaDollarSign />
    if (name.includes('stock') || name.includes('inventory')) return <FaBoxes />
    return <FaFile />
  }

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName="import-modal-content"
      backdrop="static"
    >
      <div className="import-modal-header">
        <div>
          <h3 className="import-modal-title">
            {currentStep === 2
              ? 'MAP COLUMNS'
              : currentStep === 3
                ? 'IMPORT COMPLETE'
                : 'IMPORT APPAREL'}
          </h3>
          <p className="import-modal-subtitle">
            {currentStep === 2
              ? 'CONFIGURE DATA RELATIONSHIPS'
              : currentStep === 3
                ? 'DATA SUCCESSFULLY UPLOADED'
                : 'BULK DATA UPLOAD & SYNC'}
          </p>
        </div>
        <button className="close-btn" onClick={handleCancel}>
          <FaTimes />
        </button>
      </div>

      <Modal.Body className="import-modal-body">
        {/* Step Indicators */}
        <div className="step-indicators">
          <div
            className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}
          >
            <div className="step-number">{currentStep > 1 ? '✓' : '1'}</div>
            <div className="step-label">UPLOAD FILE</div>
          </div>
          <div
            className={`step-line ${currentStep >= 2 ? 'active' : ''}`}
          ></div>
          <div
            className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}
          >
            <div className="step-number">{currentStep > 2 ? '✓' : '2'}</div>
            <div className="step-label">MAP COLUMNS</div>
          </div>
          <div
            className={`step-line ${currentStep >= 3 ? 'active' : ''}`}
          ></div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">VERIFY DATA</div>
          </div>
        </div>

        {/* Error Alert */}
        {uploadError && (
          <Alert
            variant="danger"
            onClose={() => setUploadError(null)}
            dismissible
            className="mt-3"
          >
            <strong>Error:</strong> {uploadError}
          </Alert>
        )}

        {/* Step 1: Upload File */}
        {currentStep === 1 && (
          <>
            <div
              className={`upload-area ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="upload-icon">
                <FaCloudUploadAlt size={50} />
              </div>
              <h4 className="upload-title">SELECT FILES TO UPLOAD</h4>
              <p className="upload-description">
                Drag and drop your product data files here.
                <br />
                Supports CSV, XLSX, or XLS formats.
              </p>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".csv,.xlsx,.xls"
                style={{ display: 'none' }}
              />

              <Button className="choose-file-btn" onClick={handleChooseFile}>
                CHOOSE FILE
              </Button>

              <button
                className="download-template-btn"
                onClick={handleDownloadTemplate}
              >
                <FaDownload className="me-2" />
                DOWNLOAD TEMPLATE
              </button>

              <p className="file-size-limit">MAXIMUM FILE SIZE: 25MB</p>
            </div>

            <div className="info-cards">
              <div className="info-card">
                <FaTable className="info-icon" />
                <div className="info-content">
                  <h5>COLUMN MATCHING</h5>
                  <p>
                    Ensure SKU, Price, and Stock columns are labeled for
                    auto-mapping.
                  </p>
                </div>
              </div>

              <div className="info-card">
                <FaImage className="info-icon" />
                <div className="info-content">
                  <h5>IMAGE LINKS</h5>
                  <p>
                    Direct URLs for product images sync automatically with the
                    catalog.
                  </p>
                </div>
              </div>

              <div className="info-card">
                <FaHistory className="info-icon" />
                <div className="info-content">
                  <h5>SYNC HISTORY</h5>
                  <p>
                    All bulk imports are logged. Revert changes within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 2: Map Columns */}
        {currentStep === 2 && (
          <div className="map-columns-container">
            <div className="mapping-section">
              <div className="mapping-header">
                <div className="file-columns-label">FILE COLUMNS</div>
                <div className="database-fields-label">DATABASE FIELDS</div>
              </div>

              <div className="mapping-rows">
                {csvHeaders.map((header, index) => (
                  <div key={index} className="mapping-row">
                    <div className="file-column">
                      <span className="column-icon">
                        {getIconForColumn(header)}
                      </span>
                      <span className="column-name">{header}</span>
                    </div>

                    <div className="arrow-icon">
                      <BsArrowRight />
                    </div>

                    <div className="database-field">
                      <Form.Select
                        value={columnMapping[header] || ''}
                        onChange={(e) =>
                          handleMappingChange(header, e.target.value)
                        }
                        className="field-select"
                      >
                        <option value="">Select Field</option>
                        {databaseFields.map((field) => (
                          <option key={field.value} value={field.value}>
                            {field.label}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Preview */}
            <div className="data-preview-section">
              <div className="preview-header">
                <span className="preview-icon">👁</span>
                <span className="preview-title">
                  DATA PREVIEW (FIRST 3 ROWS)
                </span>
                <span className="preview-filename">{selectedFile?.name}</span>
              </div>

              <div className="preview-table-container">
                <table className="preview-table">
                  <thead>
                    <tr>
                      {csvHeaders.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {csvHeaders.map((header, colIndex) => (
                          <td key={colIndex}>{row[header]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Success/Result */}
        {currentStep === 3 && uploadResult && (
          <div className="success-container">
            <div className="success-icon-wrapper">
              <FaCheckCircle className="success-icon" />
            </div>
            <h3 className="success-title">Import Successful!</h3>
            <p className="success-message">{uploadResult.message}</p>

            <div className="result-stats">
              <div className="stat-card">
                <div className="stat-value">{uploadResult.rowsInserted}</div>
                <div className="stat-label">Rows Imported</div>
              </div>
              {uploadResult.rowsFailed > 0 && (
                <div className="stat-card warning">
                  <div className="stat-value">{uploadResult.rowsFailed}</div>
                  <div className="stat-label">Rows Failed</div>
                </div>
              )}
            </div>

            <div className="success-actions">
              <Button className="success-btn" onClick={handleCancel}>
                CLOSE
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="import-modal-footer">
        <Button variant="link" className="cancel-btn" onClick={handleCancel}>
          CANCEL
        </Button>
        <span className="step-indicator-text">STEP {currentStep} OF 3</span>
        {currentStep === 2 && (
          <Button
            className="confirm-btn"
            onClick={handleVerifyData}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                UPLOADING...
              </>
            ) : (
              'CONFIRM IMPORT'
            )}
          </Button>
        )}
        {currentStep === 3 && (
          <Button className="confirm-btn" onClick={handleCancel}>
            DONE
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default ImportModal
