import { useState, useContext } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { ChatContext } from '../../../context/ChatContext';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { database, storage } from "../../../config/firebase"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import ImageIcon from '@mui/icons-material/Image';
import { v4 as uuid } from "uuid";
import {  doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore';

const Input = () => {
    const [text, setText] = useState("");
    const [file, setFile]  = useState(null);
    const { data } = useContext(ChatContext);
    const { user } = useAuth();
    

    const handleSend = async () => {
        const msgId = uuid();
        if (file) {
            const storageRef = ref(storage, uuid());
            uploadBytes(storageRef, file).then(() => {
                getDownloadURL(storageRef).then( async (downloadURL) => {
                    console.log(downloadURL);
                    await updateDoc(doc(database, "chats", data.chatId), {
                        messages: arrayUnion({
                            id: msgId,
                            text,
                            senderId: user.uid,
                            timestamp: Timestamp.now(),
                            file: downloadURL,
                        }),
                        [user.uid]: arrayUnion({
                            id: msgId,
                            sender: user.uid,
                            text,
                            file: downloadURL,
                            timestamp: Timestamp.now(),
                        }),
                        [data.payloadId]: arrayUnion({
                            id: msgId,
                            sender: user.uid,
                            text,
                            file: downloadURL,
                            timestamp: Timestamp.now(),
                        })
                    });
                })
            })
        } else {
            try {
                await updateDoc(doc(database, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: msgId,
                        sender: user.uid,
                        text,
                        timestamp: Timestamp.now(),
                    }),
                    [user.uid]: arrayUnion({
                        id: msgId,
                        sender: user.uid,
                        text,
                        timestamp: Timestamp.now(),
                    }),
                    [data.payloadId]: arrayUnion({
                        id: msgId,
                        sender: user.uid,
                        text,
                        timestamp: Timestamp.now(),
                    })
                })
            } catch (err) {
                console.log(err)
            }
        }
        await updateDoc(doc(database, "chatInfo", user.uid), {
            [data.chatId + ".lastMsg"]: text,
            [data.chatId + ".timestamp"]: serverTimestamp(),
        });
    
        await updateDoc(doc(database, "chatInfo", data.user.uid), {
            [data.chatId + ".lastMsg"]: text,
            [data.chatId + ".timestamp"]: serverTimestamp(),
        }); 
        setFile(null);
        setText("");
    }

    return (
        <div>
            <Grid container style={{padding: '20px'}}>
                    <Grid item xs={10}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth value={text} onChange={(e) => setText(e.target.value)}/>
                    </Grid>
                    <Grid xs={1} style={{float:"right"}}>
                        <Fab color="primary" aria-label="add image" ><input type="file" onChange={(e) => setFile(e.target.files[0])}/><ImageIcon /></Fab>
                    </Grid>
                    <Grid xs={1} style={{float:"right"}}>
                        <Fab color="primary" aria-label="add" onClick={handleSend}><SendIcon /></Fab>
                    </Grid>
            </Grid>
        </div>
    )
}

export default Input;
