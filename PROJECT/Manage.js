import React, { Component } from 'react'
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const db = getFirestore();
const a = getAuth();
class Manage extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', name: '', age: null, address: '', gender: '', stat: '', link: '', sports: "" }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Form submitting logic, prevent default page refresh 
  handleSubmit(event) {
    const { email, name, age, address, gender, stat, link, sports } = this.state
    event.preventDefault()
    alert(`
      ____Your Details____\n
      Email : ${email}
      Name : ${name}
      Age : ${age}
      Address : ${address}
      gender : ${gender}
      status : ${stat}
      link : ${link}
      sports: ${sports}
    `)

    const docRef = doc(db, "userid", a.currentUser?.uid);

    const data = {
      email: email,
      first: name,
      address: address,
      gender: gender,
      link: link,
      status: stat,
      sports: sports
    }
    updateDoc(docRef, data)
      .then(docRef => {
        console.log("A New Document Field has been added to an existing document");
      })
      .catch(error => {
        console.log(error);
      })

  }

  // Method causes to store all the values of the 
  // input field in react state single method handle 
  // input changes of all the input field using ES6 
  // javascript feature computed property names
  handleChange(event) {
    this.setState({
      // Computed property names
      // keys of the objects are computed dynamically
      [event.target.name]: event.target.value
    })
  }

  // Return a controlled form i.e. values of the 
  // input field not stored in DOM values are exist 
  // in react component itself as state
  render() {
    return (
      <div>
        <Container>
          <Form onSubmit={this.handleSubmit}>

            <Form.Group controlId="form.Email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email"
                placeholder="name@example.com"
                name='email'
                value={this.state.email}
                onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="form.Name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"
                placeholder="Enter name"
                name='name'
                value={this.state.name}
                onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="form.Number">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number"
                name='age'
                placeholder='Age'
                value={this.state.age}
                onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="form.Select">
              <Form.Label>Gender</Form.Label>
              <Form.Select aria-label="Gender" name='gender'
                placeholder='gender'
                value={this.state.gender}
                onChange={this.handleChange}>
                <option value="prefer not to say">--Please select an option--</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="form.Address">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text"
                name='address'
                placeholder='Address'
                value={this.state.address}
                onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="form.Link">
              <Form.Label>Social Media URL</Form.Label>
              <Form.Control type="text"
                name='link'
                placeholder='Social Media link'
                value={this.state.link}
                onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="form.Select">
              <Form.Label>Status</Form.Label>
              <Form.Select aria-label="status" name='stat'
                placeholder='stat'
                value={this.state.stat}
                onChange={this.handleChange}>
                <option value="unknown">--Please select an option--</option>
                <option value="female">Available</option>
                <option value="male">Busy</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="form.Select">
              <Form.Label>Favorite Sport</Form.Label>
              <Form.Select aria-label="Favorite Sport" name='sports'
                placeholder='sport'
                value={this.state.sports}
                onChange={this.handleChange}>
                <option value="Unknown">--Please select an option--</option>
                <option value="Basketball">Basketball</option>
                <option value="Volleyball">Volleyball</option>
                <option value="Badminton">Badminton</option>
                <option value="Jogging">Jogging</option>
                <option value="Weight Lifting">Weight Lifting</option>
                <option value="Swimming">Swimming</option>
              </Form.Select>
            </Form.Group>

            <Button>Save Changes</Button>

          </Form>
        </Container>


      </div >
    )
  }
}

export default Manage