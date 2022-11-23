import { List , ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { doc, deleteDoc } from "firebase/firestore";
import React, {useState, useEffect } from 'react';
import { database } from '../../../config/firebase';
import ErrorIcon from '@mui/icons-material/Error';
import { TextField , Button, Rating } from '@mui/material';
import { collection, addDoc,serverTimestamp } from 'firebase/firestore';
import { Form } from 'react-bootstrap'

const ReviewList=({arr, iden, num})=>{
    
        ////////////////////////////////
        const [open, setOpen] = useState(false);
        const Popup = ({ text, closePopup }) => {
            const [content,setContent]=useState([]);
            const [rate, setRate]=useState(5);
          return (
            <div className="popup-container">
             <div className="popup-body">
              <h1>{text}</h1>
        
              <form>
              <Rating name="simple-controlled" value={rate} onChange={e=>setRate(e.target.value)}/>
              <br></br>
                <TextField id="outlined-basic" label="Comment" variant="outlined" style={{margin:"6px 6px"}} size="big" value={content}
                    onChange={e=>setContent(e.target.value)} />
                <br></br>
                <Button variant="contained" color="primary" style={{margin:"5px 5px"}} 
                        onClick={() => {
                            if (arr.item.uid == iden) {
                            deleteDoc(doc(database,'review',arr.id));
                            addDoc(collection(database,'review'),{
                                reviewee:arr.item.reviewee,
                                rate:rate,
                                content:content,
                                timestamp: serverTimestamp(),
                                uid:iden
                              });
                              setContent('');
                              setRate(5);
                              setOpen(false);
                            } else {
                                console.log("you cannot update other's review");
                            }
                        }}>Change event</Button>
              </form>
        
              <Button onClick={closePopup} size="small">Close X</Button>
             </div>
            </div>
          );
        };
        ////////////////////////////////
        const deleteRequest = () => {
            if (arr.item.uid == iden) {
                deleteDoc(doc(database,'review',arr.id));
            }
        }
    ////////////////////////////////
    const handleReport = () => {
        
        let a = document.createElement('a');
    
        a.target = '_blank';

        // one long line
        a.href = "mailto:team23project@gmail.com?subject=Report%20A%20Review&cc=" + arr.item.uid +"&body=Report%20has%20been%20submitted%0A------------------------------------------------------------%0AReport%20Username%20->%20"+ arr.item.uid +" %0APlease%20describe%20the%20reason%20->%20%0A%0A";

        if (window.confirm('Report via email: Do you want to open a new tab?')) {
          a.click();
        };
      }
    ////////////////////////////////

    const d = new Date(arr.item.timestamp*1000);
    let text = d.toString();
    const primary = "Rate: " + arr.item.rate + "/5. Time:" + text.substring(0,10);
    const secondary = "Comment: " +arr.item.content + ". Username: "+ arr.item.uid;
    return (
        
        <div>
        <List className="todo__list"> 
            <ListItem>
                <ListItemAvatar />
                    <ListItemText primary={primary} secondary={secondary} />
            </ListItem>
            <Edit fontSize="small" style={{opacity:0.7}} onClick={() => setOpen(true)}/>
            {open ? <Popup text="Edit Review" closePopup={() => setOpen(false)} /> : null}
            <DeleteIcon fontSize="small" style={{opacity:0.7}} onClick={() => {deleteRequest()}}/>
            <ErrorIcon fontSize="small" style={{opacity:0.7}} onClick={() => { deleteDoc(doc(database,'review',arr.id)), handleReport()}}/>
        </List>
        </div>

    )
};

export default ReviewList;

// db.collection('todos').doc(arr.id).delete()
//  ,orderBy('timestamp','desc')