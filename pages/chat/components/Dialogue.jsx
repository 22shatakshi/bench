import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { ChatContext } from '../../../context/ChatContext';
import Message from "./Message"
import Input from "./Input"
import Appbar from "./Appbar";
import { getDoc, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { database } from '../../../config/firebase';
import { useAuth } from "../../../context/AuthContext"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    chatSection: {
      width: '100%',
      height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
      height: '70vh',
      overflowY: 'auto'
    }
});

const Dialogue = () => {
    const { data } = useContext(ChatContext);
    const { user } = useAuth();
    const [msgs, setMsgs] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        console.log(data.chatId)
        const unsub = onSnapshot(doc(database, "chats", data.chatId), (doc)=>{
            doc.exists() && setMsgs(doc.get(user.uid));
        })
        return () => {
            unsub()
        };
    }, [data.chatId])

    return (
        <div>
            <Grid component={Paper} xs={12}>
                <Appbar />
                <List className={classes.messageArea}>
                    {msgs?.map(m=>(
                        <Message message={m}/>
                    ))}
                </List>
                <Divider />
                <Input />
            </Grid>
        </div>
    )
}

export default Dialogue;

