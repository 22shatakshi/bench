import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Forgot = () => {
    const router = useRouter();
    const [data, setData] = useState({
        email: '',
    })
    const [error, setError] = useState("")
    const auth = getAuth();
    const handleForgot = async (e: any) => {
        e.preventDefault()
        try {
            sendPasswordResetEmail(auth, data.email)
            router.push("/login")
        } catch (err) {
            setError("Error")
            console.log(err)
        }
    }
    

    // Password reset email sent!

    return (
        <div
        style={{
          width: '40%',
          margin: 'auto',
        }}
      >
        <h1 className="text-center my-3 ">Forgot Password or Username</h1>
        <Form onSubmit={handleForgot}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e: any) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
              value={data.email}
              required
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Send Email
          </Button>
          <Form.Label>{error}</Form.Label>
        </Form>
      </div> 
    )
}

export default Forgot