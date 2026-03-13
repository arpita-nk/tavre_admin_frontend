import React, { useState } from 'react'
import '../../styles/login.css'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login failed')
      }

      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error.message)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="brand">
        <h1 className="brand-title">TAVRÉ</h1>
        <p className="brand-sub">PREMIUM CLOTHING</p>
      </div>

      <Card className="login_card">
        <Card.Body>
          <Card.Title className="card-title">Admin Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="email_label">Email address</Form.Label>
              <Form.Control
                className="email_input"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="password_label">Password</Form.Label>
              <Form.Control
                className="password_input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="login_button" type="submit">
              SECURE LOGIN
            </Button>

            <div className="footer-text">
              Don’t have credentials? <span>Request Access</span>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login
