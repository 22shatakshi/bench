import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { getAuth, updateEmail} from 'firebase/auth'
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { database } from '../../config/firebase';

const setEmail = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [data, setData] = useState({
        newEmail: '',
      })
    const [msg, setMsg] = useState("")

    const handleSetEmail = async (e: any) => {
        e.preventDefault()
        var useridRef
        var usernameRef
        if (user) {
          useridRef = doc(database, "userid", user.uid)
          const docSnap = await getDoc(useridRef)
          let username : string = docSnap.get("username")
          usernameRef = doc(database, "username", username)
        }
      
        try {
          if (user) {
            updateEmail(user, data.newEmail)
            if (useridRef && usernameRef) {
              await updateDoc(useridRef, {
                email: data.newEmail
              });
              await updateDoc(usernameRef, {
                email: data.newEmail
              });
            } 
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