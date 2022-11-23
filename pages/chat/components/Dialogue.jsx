import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { ChatContext } from '../../../context/ChatContext';
import Message from "./Message"
import Input from "./Input"
import { getDoc, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { database } from '../../../config/firebase';

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
    const [msgs, setMsgs] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        console.log(data.chatId)
        const unsub = onSnapshot(doc(database, "chats", data.chatId), (doc)=>{
            doc.exists() && setMsgs(doc.data().messages);
        })
        return () => {
            unsub()
        };
    }, [data.chatId])

    return (
        <div>
            <span>{data.user?.displayName}</span>
            <List className={classes.messageArea}>
                {msgs.map(m=>(
                    <Message message={m}/>
                ))}
            </List>
            <Divider />
            <Input />
        </div>
    )
}

export default Dialogue;