import React, { Component } from 'react'
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import currentUserDataRequest from '../../data/currectUser'


const db = getFirestore();
const a = getAuth();

class Manage extends Component {
  constructor(props) {
    super(props)
    this.loading = true
    this.state = {  
      name: '', 
      age:'', 
      address: '', 
      gender: '', 
      stat: '', 
      instagram: '', 
      twitter: '', 
      facebook: '', 
      sports: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async fetchUserData() {
    const userData = await currentUserDataRequest();
    this.setState({name: userData.name, age: userData.age, address: userData.address, gender: userData.gender, stat: userData.status, instagram: userData.instagram, twitter: userData.twitter, facebook: userData.facebook, sports: userData.sports})
  }

  componentDidMount() {
    this.fetchUserData();
    this.loading = false;
    console.log("componentDidMount called")
    console.log(this.loading)
    this.forceUpdate()
  }

  // Form submitting logic, prevent default page refresh 
  handleSubmit(event) {
    const { name, age, address, gender, stat, instagram, twitter, facebook, sports } = this.state
    event.preventDefault()
    alert(`
      ____Your Details____\n
      Name : ${name}
      Age : ${age}
      Address : ${address}
      Gender : ${gender}
      Status : ${stat}
      Instagram : ${instagram}
      Twitter: ${twitter}
      Facebook: ${facebook}
      Sports: ${sports}
    `)

    const idDocRef = doc(db, "userid", a.currentUser?.uid);

    const data = {
      name: name,
      address: address,
      age: age,
      gender: gender,
      instagram: instagram,
      twitter: twitter,
      facebook: facebook,
      status: stat,
      sports: sports
    }
    updateDoc(idDocRef, data)
      .then(idDocRef => {
        console.log("A New Document Field has been added to an existing document");
      })
      .catch(error => {
        console.log(error);
      })
    updateProfile(a.currentUser, {
      displayName: data.name, photoURL: ""
    }).then(() => {
      console.log("Profile updated");
    }).catch((error) => {
      console.log(error);
    });  
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
    if (this.loading == true) {
      return (
        <div>
          Loading
        </div>
      )
    }
    else {
      return (
        <div>
          <Container>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="form.Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"
                  placeholder={this.state.name}
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
                <Form.Label>Instagram URL</Form.Label>
                <Form.Control type="text"
                  name='instagram'
                  placeholder='Instagram'
                  value={this.state.instagram}
                  onChange={this.handleChange} />
              </Form.Group>

              <Form.Group controlId="form.Link">
                <Form.Label>Twitter URL</Form.Label>
                <Form.Control type="text"
                  name='twitter'
                  placeholder='Twitter'
                  value={this.state.twitter}
                  onChange={this.handleChange} />
              </Form.Group>

              <Form.Group controlId="form.Link">
                <Form.Label>Facebook URL</Form.Label>
                <Form.Control type="text"
                  name='facebook'
                  placeholder='Facebook'
                  value={this.state.facebook}
                  onChange={this.handleChange} />
              </Form.Group>


              <Form.Group controlId="form.Select">
                <Form.Label>Status</Form.Label>
                <Form.Select aria-label="status" name='stat'
                  placeholder='stat'
                  value={this.state.stat}
                  onChange={this.handleChange}>
                  <option value="unknown">--Please select an option--</option>
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="form.Select">
                <Form.Label>Favorite Sport</Form.Label>
                <Form.Select aria-label="Favorite Sport" name='sports'
                  placeholder='sport'
                  value={this.state.sports}
                  onChange={this.handleChange}>
                  <option value="any">--Please select an option--</option>
                  <option value="basketball">Basketball</option>
                  <option value="volleyball">Volleyball</option>
                  <option value="badminton">Badminton</option>
                  <option value="jogging">Jogging</option>
                  <option value="weight lifting">Weight Lifting</option>
                  <option value="swimming">Swimming</option>
                </Form.Select>
              </Form.Group>

              <Button onClick={this.handleSubmit}>Save Changes</Button>

            </Form>
          </Container>


        </div >
      )
    }
  }
}

export default Manage
