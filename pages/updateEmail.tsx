import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { getAuth, updateEmail, EmailAuthProvider } from 'firebase/auth'

const setEmail = () => {
    const router = useRouter()
    const auth = getAuth();
    const user = auth.currentUser;
    const [data, setData] = useState({
        newEmail: '',
      })
    const [msg, setMsg] = useState("")


    const handleSetEmail = async (e: any) => {
        e.preventDefault()
        
        try {
          if (user) {
            updateEmail(user, data.newEmail)
            setMsg("Email updated")
          }    
        } catch (err) {
          setMsg("Email failed to update")
          console.log(err)
        } 
    }
    return (
        <div
          style={{
            width: '40%',
            margin: 'auto',
          }}
        >
          <h1 className="text-center my-3 ">Update Email</h1>
          <Form onSubmit={handleSetEmail}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter new Email"
                required
                onChange={(e: any) =>
                  setData({
                    ...data,
                    newEmail: e.target.value,
                  })
                }
                value={data.newEmail}
              />
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Update Email
            </Button>
            <Form.Label>{msg}</Form.Label>
          </Form>
        </div>
      )

}

export default setEmail