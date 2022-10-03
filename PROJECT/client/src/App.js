import './App.css';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'

function App() {
  const GoogleLogin = () =>{
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then(
      (userCred)=>{
        console.log(userCred);
      });
  };

  return (
    <div className="App">
        <button onClick={GoogleLogin}>Login with Google</button>
    </div>
  );
}

export default App;
