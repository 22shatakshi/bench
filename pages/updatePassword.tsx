import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { useAuth } from '../context/AuthContext'

const reauthenticate = async (oldPassword: string) => {
  try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user && user.email) {
        const credential = await EmailAuthProvider.credential(
            user.email,
            oldPassword
        );
      await reauthenticateWithCredential(user, credential);
      return true
      } 
  } catch (e) {
      return false
  }
}

const setPassword = () => {
    const router = useRouter()
    const auth = getAuth();
    const user = auth.currentUser;
    const { logout } = useAuth()
    const [data, setData] = useState({
        oldPassword: '',
        newPassword: '',
      })
    const [msg, setMsg] = useState("Once you change your password. You would have to relogin with your new credential")


    const handleSetPassword = async (e: any) => {
        e.preventDefault()
        
        try {
          if (user) {
            if (await reauthenticate(data.oldPassword)) {
              await updatePassword(user, data.newPassword)
              setMsg("Password changed. Please log in again")
              logout()
              router.push('/login')
            }
            else {
              setMsg("Old password does not match")
            }     
          }    
        } catch (err) {
          setMsg("Password error")
          console.log(err)
        }
    
        console.log(data.newPassword)
    }
    return (
        <div
          style={{
            width: '40%',
            margin: 'auto',
          }}
        >
          <h1 className="text-center my-3 ">Update Password</h1>
          <Form onSubmit={handleSetPassword}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter old password"
                required
                onChange={(e: any) =>
                  setData({
                    ...data,
                    oldPassword: e.target.value,
                  })
                }
                value={data.oldPassword}
              />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                required
                onChange={(e: any) =>
                  setData({
                    ...data,
                    newPassword: e.target.value,
                  })
                }
                value={data.newPassword}
              />
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Update Password
            </Button>
            <Form.Label>{msg}</Form.Label>
          </Form>
        </div>
      )

}

export default setPassword