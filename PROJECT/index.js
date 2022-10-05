const express = require("express")
const firebase = require('firebase')

const app = express();

const firebaseConfig = {
    apiKey: "AIzaSyD7KPuHywMl6jY8RPkEOpIN5BxfwZq0U1U",
    authDomain: "bench-788ba.firebaseapp.com",
    projectId: "bench-788ba",
    storageBucket: "bench-788ba.appspot.com",
    messagingSenderId: "311118344518",
    appId: "1:311118344518:web:aae8b929ac7243e4983547",
    measurementId: "G-DMZ8SW8D3B"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  app.get('/',(req,res)=>{
    (async()=>{
        try {
            let response =[]

            await db.collection('users').get().then(querysnapshot=>{
                let docs = querysnapshot.docs;

                for (let doc of docs) {
                    response.push(doc.data())
                }
                return res.status(200).send(response)
            })
        } catch (error) {
            return res.status(500).send(error)
        }
    })()
  })

  const port=process.env.port || 4000

  app.listen(port,()=>{
    console.log("Server running on port", port)
  })