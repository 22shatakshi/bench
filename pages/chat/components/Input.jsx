import { useState, useContext } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { ChatContext } from '../../../context/ChatContext';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { database } from "../../../config/firebase"
import ImageIcon from '@mui/icons-material/Image';
import {  doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore';

const Input = () => {
    const [text, setText] = useState("");
    const [file, setFile]  = useState(null);
    const { data } = useContext(ChatContext);
    const { user } = useAuth();
    

    const handleSend = async () => {
        if (file) {

        } else {
            try {
                await updateDoc(doc(database, "chats", data.chatId), {
                    messages: arrayUnion({
                        sender: user.uid,
                        text,
                        data: Timestamp.now(),
                    })
                })
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
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div>
            <Grid container style={{padding: '20px'}}>
                    <Grid item xs={10}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth value={text} onChange={(e) => setText(e.target.value)}/>
                    </Grid>
                    <Grid xs={1} style={{float:"right"}}>
                        <Fab color="primary" aria-label="add image"><ImageIcon /></Fab>
                    </Grid>
                    <Grid xs={1} style={{float:"right"}}>
                        <Fab color="primary" aria-label="add" onClick={handleSend}><SendIcon /></Fab>
                    </Grid>
            </Grid>
        </div>
    )
}

export default Input;
