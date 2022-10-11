import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'

const Signup = () => {
  const router = useRouter()
  const { user, signup } = useAuth()
  console.log(user)
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState("")

  const handleSignup = async (e: any) => {
    e.preventDefault()

    try {
      if (data.password.length < 8 || data.password.length > 20) {
        setError("Password needs to be 8-20 characters long.")
      }
      else {
        await signup(data.email, data.password)
        router.push('/dashboard')
      }
    } catch (err) {
      setError("The Email is already in use. Please login or sign up with a different email.")
      console.log(err)
    }

    console.log(data)
  }

  return (
    <div
      style={{
        width: '40%',
        margin: 'auto',
      }}
    >
      <h1 className="text-center my-3 ">Signup</h1>
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={(e: any) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            value={data.email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={(e: any) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            value={data.password}
          />
          
        </Form.Group>

        <Button variant="primary" type="submit">
          Signup
        </Button>
        <Form.Label>{error}</Form.Label>
      </Form>
    </div>
  )
}

export default Signup
