import React, {useState, useEffect } from 'react';
import {TextField , Button, List, Divider, FormControl, InputLabel, NativeSelect} from '@mui/material';
import { collection , query, onSnapshot, addDoc, doc, deleteDoc, where} from 'firebase/firestore';
import { database } from '../../config/firebase';
import { getAuth} from 'firebase/auth'

function Notification() {

    const auth = getAuth();
    const q = query(collection(database,'notification'), where('uid', "==", auth.currentUser?.uid));
    const [info,setInfo]=useState([]);
    
    useEffect(() => {
            onSnapshot(q,(snapshot)=>{
                setInfo(snapshot.docs.map(doc=>({
                  id: doc.id,
                  item: doc.data()
                }
                )))
           })
      },[]);

      const [newEmail,setNewEmail]=useState();
      const [enable,setEnable]=useState(true);

      const setNotification = () => {
        if (info[0] != null) deleteDoc(doc(database,'notification',info[0]?.id));
        if (newEmail == null) {
            window.alert("Email field is empty!");
        } else {
            if (enable == '') setEnable(true)
            addDoc(collection(database,'notification'),{
                email:newEmail,
                enable:enable,
                uid:auth.currentUser?.uid
            });
            window.alert("New Email:" + newEmail + ", Enabled:" + enable );
        }

      };

    return (
        <div>
            <List component="nav" aria-label="mailbox folders">
                
                <TextField id="outlined-basic" label="Email" variant="outlined" style={{margin:"5px 1px"}} size="small" inputProps={{ maxLength: 50 }}
                onChange={e=>setNewEmail(e.target.value)}  />
                <Divider />

                <FormControl halfWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">Mode</InputLabel>
                    <NativeSelect defaultValue={true} onChange={e=>setEnable(e.target.value)}>
                        <option value={true}>Enable</option>
                        <option value={false}>Disable</option>
                    </NativeSelect>
                </FormControl>

            </List>
            <Divider />
            <Button variant="contained" style={{margin:"5px 5px"}} color="primary" size="small" onClick={setNotification} >Set</Button>
        </div>
    );
  
}

export default Notification;

