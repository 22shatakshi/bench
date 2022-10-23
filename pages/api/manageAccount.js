import React,{ Component } from 'react'
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import {getAuth} from 'firebase/auth';


const db = getFirestore();
const a = getAuth();
class Manage extends Component{
  constructor(props){
    super(props)
    this.state = { email:'',name:'', age:null, address:'',gender:'', stat:'', link:''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  // Form submitting logic, prevent default page refresh 
  handleSubmit(event){
    const { email, name, age, address, gender, stat, link } = this.state
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
    `)

    const docRef = doc(db, "userid", a.currentUser?.uid);

    const data = {
        email: email,
        first: name,
        address: address,
        gender: gender,
        link: link,
        status: stat 
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
  handleChange(event){
    this.setState({
      // Computed property names
      // keys of the objects are computed dynamically
      [event.target.name] : event.target.value
    })
  }
  
  // Return a controlled form i.e. values of the 
  // input field not stored in DOM values are exist 
  // in react component itself as state
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input 
            name='email'
            placeholder='Email' 
            value = {this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            name='name' 
            placeholder='Name'
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor='age'>Age</label>
          <input
            name='age' 
            placeholder='Age'
            value={this.state.age}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor='address'>Address</label>
          <input
            name='address' 
            placeholder='Address'
            value={this.state.address}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label>Stat</label>
          <input
            name='stat' 
            placeholder='stat'
            value={this.state.stat}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label>Gender</label>
          <input
            name='gender' 
            placeholder='gender'
            value={this.state.gender}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label>Social Media URL</label>
          <input
            name='link' 
            placeholder='link'
            value={this.state.link}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <button>Change</button>
        </div>

        
      </form>
    )
  }
}
  
export default Manage