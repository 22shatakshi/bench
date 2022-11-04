import React, {useState, useEffect } from 'react';
import {TextField , Button } from '@mui/material';
import Todo from './component/todo';
import { collection , query, orderBy , onSnapshot, addDoc,serverTimestamp, where} from 'firebase/firestore';
import { database } from '../../config/firebase';


function App({iden}) {

  const q = query(collection(database,'event'),where("uid", '==', iden),orderBy('timestamp', 'desc'));

  const [todos,setTodos]=useState([]);
  const [content,setContent]=useState([]);
  const [input, setInput]=useState('');

  
  useEffect(() => {
          onSnapshot(q,(snapshot)=>{
              setTodos(snapshot.docs.map(doc=>({
                id: doc.id,
                item: doc.data()
              })))
         })
    },[input]);
  const addTodo=(e)=>{
    e.preventDefault();
       addDoc(collection(database,'event'),{
         todo:input,
         content:content,
         timestamp: serverTimestamp(),
         uid:iden
       })
       console.log('click')
      setInput('')
      setContent('')
  };
  console.log(todos);

  return (
    <div className="App">
      <h2> myEvents</h2>
      <form>
         <TextField id="outlined-basic" label="Title" variant="outlined" style={{margin:"0px 5px"}} size="small" value={input}
         onChange={e=>setInput(e.target.value)} />
         <br></br>
         <TextField id="outlined-basic" label="Content" variant="outlined" style={{margin:"5px 5px"}} size="big" value={content}
         onChange={e=>setContent(e.target.value)} />
         <br></br>
        <Button variant="contained" style={{margin:"5px 5px"}} color="primary" size="small" onClick={addTodo}>Add Event</Button>
      </form>
      <ul>
          {todos.map(item=> <Todo key={item.id} arr={item} iden={iden}/>)}
      </ul>
    </div>
  );
}

export default App;

