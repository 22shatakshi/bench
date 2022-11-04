import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import { database } from '../config/firebase'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const Signup = () => {
  const router = useRouter()
  const { user, signup } = useAuth()
  console.log(user)
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    dob: '',
    name: ''
  })
  const [msg, setMsg] = useState("")

  const handleSignup = async (e: any) => {
    e.preventDefault()
    try {
      let success: boolean = true;
      if (data.confirmPassword != data.password) {
        setMsg("Password does not match.")
        success = false
      }
      if (data.password.length < 8 || data.password.length > 20) {
        setMsg("Password needs to be 8-20 characters long.")
        success = false
      }
      const usersRef = doc(database, "username", data.username);
      const docSnap = await getDoc(usersRef)
      if (docSnap.exists()) {
        setMsg("Username is taken.")
        success = false
      }
      if (success) {
        await signup(data.email, data.password)
        const curUser = getAuth().currentUser
        const userData = {
          email: curUser?.email,
          uid: curUser?.uid
        }
        try {
          if (curUser) {
            await setDoc(doc(database, "userid", curUser.uid), {
              email: userData.email,
              uid: userData.uid,
              username: data.username,
              birthday: "",
              name: data.name,
              address: "",
              rating: 0,
              gender: "",
              sports: "any",

              //--------------------------------------------Block----------------------------------------------------
              blockUsernames: []
              //-----------------------------------------------------------------------------------------------------


            });
          }
          await setDoc(doc(database, "username", data.username), {
            uid: userData.uid,

          });
        } catch (e) {
          console.log("Error adding document: ", e)
        }
        router.push('/dashboard')
      }
    } catch (err) {
      setMsg("The Email is already in use. Please login or sign up with a different email.")
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

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            required
            onChange={(e: any) =>
              setData({
                ...data,
                username: e.target.value,
              })
            }
            value={data.username}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Displayed Name</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter displayed name"
            required
            onChange={(e: any) =>
              setData({
                ...data,
                name: e.target.value,
              })
            }
            value={data.name}
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Reenter Password"
            required
            onChange={(e: any) =>
              setData({
                ...data,
                confirmPassword: e.target.value,
              })
            }
            value={data.confirmPassword}
          />

        </Form.Group>

        <Button variant="primary" type="submit">
          Signup
        </Button>
        <Form.Label>{msg}</Form.Label>
      </Form>
    </div>
  )
}
export default Signup

