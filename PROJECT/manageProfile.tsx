import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import { database } from '../config/firebase'
import { doc, collection, setDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const manageProfile = () => {
    const router = useRouter()
    const curUser = getAuth().currentUser

    const userData = {
        email: curUser?.email,
        uid: curUser?.uid,
    }

    const [data, setData] = useState({
        email: curUser?.email,
        uid: curUser?.uid,
    })
    const [username, setUsername] = useState("");
    const [birthday, setBirthday] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState({ formBasicRadio: "", another: "another" });

    const [msg, setMsg] = useState("")

    // Specifically for Radio "gender"
    const { formBasicRadio } = gender;

    const handleChange = e => {
        e.persist();
        console.log(e.target.value);

        setGender(prevState => ({
            ...prevState,
            formBasicRadio: e.target.value
        }));
    };

    const handleManageProfile = async (e: any) => {
        e.preventDefault();

        try {
            await setDoc(doc(database, "username", data.username),
                {
                    username: username,
                    birthday: birthday,
                    first: first,
                    last: last,
                    address: address,
                    gender: gender,
                });
            console.log("Document written with username: ", data.username)
            setMsg("Successfully updated the profile")
        } catch (e) {
            setMsg("Failed to update the profile")
            console.log("Error adding document: ", e)
        }

        return (
            <div>

                <h1 className="text-center my-3 ">Manage Your Profile</h1>

                <Form onSubmit={handleManageProfile}>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNumber">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="MMDDYYYY"
                            required
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            required
                            value={first}
                            onChange={(e) => setFirst(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            required
                            value={last}
                            onChange={(e) => setLast(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter address"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicRadio">
                        <Form.Check
                            value="Female"
                            type="radio"
                            aria-label="radio 1"
                            label="Female"
                            onChange={handleChange}
                            checked={formBasicRadio == "Female"}
                        />
                        <Form.Check
                            value="Male"
                            type="radio"
                            aria-label="radio 2"
                            label="Male"
                            onChange={handleChange}
                            checked={formBasicRadio == "Male"}
                        />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>file input</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Save
                    </Button>

                </Form>

            </div>
        )
    }
}
export default manageProfile
