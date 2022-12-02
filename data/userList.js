import { database } from '../config/firebase'
import { collection, query, onSnapshot, getDocs } from "firebase/firestore";

// const q = query(collection(database, "username"));
// let users = []
// const userlistRequest = new Promise((resolve) => {
//         const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 let data = doc.data();
//                 var user = {
//                     uid: data.uid,
//                     username: data.username,
//                     email: data.email,
//                 }
//                 users.push(user);
//                 //console.log("userList.js", user);
//                 //console.log("userlist.js", users);
//             });
//             //console.log("userList.js", users[0].username)
//             //console.log("Current users: ", users.join(", "));
//         });
//         resolve(users);
// })

// export default userlistRequest;
let state = 0;
let users = []

async function userlistRequest() {
    const q = query(collection(database, "userid"));
    if (state) {
        let users = []
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = doc.data()
          var user = {
              uid: data.uid,
              username: data.username,
              email: data.email,
              name: data.name,
              age: data.age,
              status: data.status,
              sports: data.sports,
              rating: data.rating,
              address: data.address,
              gender: data.gender,
              instagram: data.instagram,
              twitter: data.twitter,
              facebook: data.facebook,
              photoURL: data.photoURL,
          }
          users.push(user)
          //console.log("userList.js", user)
          //console.log("userlist.js", users)
          //print out a bunch of undefined objects
        });
        return users;
        //console.log("userList.js", users[0].username)
        //console.log("Current users: ", users.join(", "));
      });
} else {
    //initialization
    const querySnapshot = await getDocs(collection(database, "userid"));
    users = []
    try {
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            users.push({
                uid: data.uid,
                username: data.username,
                email: data.email,
                name: data.name,
                age: data.age,
                status: data.status,
                sports: data.sports,
                rating: data.rating,
                address: data.address,
                gender: data.gender,
                instagram: data.instagram,
                twitter: data.twitter,
                facebook: data.facebook,
                photoURL: data.photoURL,
            })
        })
        state = 1;
    } catch (e) {
        console.log(e)
    }
}
console.log(users)
return users;
}

export default userlistRequest
