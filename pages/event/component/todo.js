import { List , ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { doc, deleteDoc } from "firebase/firestore";
import React, {useState, useEffect } from 'react';
import {TextField , Button } from '@mui/material';
import { database } from '../../../config/firebase';
import { collection, addDoc,serverTimestamp } from 'firebase/firestore';
import ZoomInIcon from '@mui/icons-material/ZoomIn';




const Todo=({arr, iden})=>{

    ////////////////////////////////

    const Popup = ({ text, closePopup }) => {

        const [content,setContent]=useState([]);
        const [input, setInput]=useState('');

      return (
        <div className="popup-container">
         <div className="popup-body">
          <h1>{text}</h1>
    
          <form>
            <TextField id="outlined-basic" label="Title" variant="outlined" style={{margin:"0px 5px"}} size="small" value={input}
                onChange={e=>setInput(e.target.value)} />

            <TextField id="outlined-basic" label="Content" variant="outlined" style={{margin:"6px 6px"}} size="big" value={content}
                onChange={e=>setContent(e.target.value)} />
            <br></br>
            <Button variant="contained" color="primary" style={{margin:"5px 5px"}} 
                    onClick={() => {
                        deleteDoc(doc(database,'event',arr.id));
                        addDoc(collection(database,'event'),{
                        todo:input,
                        content:content,
                        timestamp: serverTimestamp(),
                        uid:iden
                          });
                          setContent('');
                          setInput('');
                          setOpen(false);
                        }}>Change event</Button>
          </form>
          <Button onClick={closePopup} size="small">Close X</Button>
         </div>
        </div>
      );
    };
    
    const View = ( { closeDetail } ) => {

      console.log("called")
      return(

        <div className="popup-container">
         <div className="popup-body">
    
          <form>
            <h1>Event Detail</h1>
            <h1>{arr.item.todo}</h1>
            <h2>{arr.item.content}</h2>
            <br></br>
          </form>
          <Button onClick={closeDetail} size="small">Close X</Button>
         </div>
        </div>

      );
    };
    
    ////////////////////////////////

    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState(false);
     
    return (
        <List className="todo__list"> 
            <ListItem>
                <ListItemAvatar />
                    <ListItemText primary={arr.item.todo} secondary={arr.item.content} />
            </ListItem>
            <ZoomInIcon fontSize="small" style={{opacity:0.7}} onClick={() => setDetail(true)}/>
            {detail ? <View closeDetail={() => setDetail(false)} /> : null}

            <Edit fontSize="small" style={{opacity:0.7}} onClick={() => setOpen(true)}/>
            {open ? <Popup text="Edit Event" closePopup={() => setOpen(false)} /> : null}
            <DeleteIcon fontSize="small" style={{opacity:0.7}} onClick={() => {deleteDoc(doc(database,'event',arr.id))}}/>
        </List> 

    )
};

export default Todo;

// db.collection('todos').doc(arr.id).delete()
//  ,orderBy('timestamp','desc')
// <detailView title={arr.item.todo} text={arr.item.content} closeDetail={() => setDetail(false)} /> : null}