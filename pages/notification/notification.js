import React, {useState, useEffect } from 'react';
import {TextField , Button, List, Divider, FormControl, InputLabel, NativeSelect} from '@mui/material';
import { collection , query, onSnapshot, addDoc, doc, deleteDoc, where, getDoc} from 'firebase/firestore';
import { database } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext'

function Notification() {
    const { user } = useAuth();

    var notificationDoc;
    const [enable, setEnable] = useState(true);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchNotificationData = async () => {
            const docSnap = await getDoc(doc(database, "notification", user.uid));
            notificationDoc = docSnap;
            const email = docSnap.data().email;
            const enable = docSnap.data().enable;
            setEnable(enable)
            setEmail(email);
        }
        fetchNotificationData();
      },[user?.uid]);

      const setNotification = async () => {
        if (email == "" || email == null) {
            window.alert("Email field is empty!");
        } else {
            await updateDoc(notificationDoc, {
                email: email,
                enable: enable,
            }); 
            window.alert("New Email:" + newEmail + ", Enabled:" + enable );
        }

      };

    return (
        <div>
            <List component="nav" aria-label="mailbox folders">
                
                <TextField id="outlined-basic" label={email} variant="outlined" style={{margin:"5px 1px"}} size="small" inputProps={{ maxLength: 50 }}
                onChange={e=>setEmail(e.target.value)} />
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
            <Button variant="contained" style={{margin:"5px 5px"}} color="primary" size="small" onClick={setNotification}>Set</Button>
        </div>
    );
  
}

export default Notification;