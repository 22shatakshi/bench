import React, { useEffect, useState, useContext } from "react";
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { useAuth } from "../../../context/AuthContext";
import { doc, onSnapshot } from 'firebase/firestore';
import { database } from '../../../config/firebase'
import { ChatContext } from '../../../context/ChatContext'


const ChatList = () => { 
    const [chatList, setChatList] = useState([]);
    const { user } = useAuth();
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChatList = () => {
            const unsub = onSnapshot(doc(database, "chatInfo", user.uid), (doc) => {
                setChatList(doc.data());
            });
            return () => {
                unsub();
            }
        }

        user.uid && getChatList();
        console.log(Object.entries(chatList));
    }, [user.uid])

    const handleSelect = (u) => {
        dispatch({type:"CHANGE_USER", payload: u})
    }
    
    return (
        <Paper style={{maxHeight: 430, overflow: 'auto'}}>
        <List >
        <>
        {Object.entries(chatList)?.sort((a,b)=>b[1].timestamp - a[1].timestamp).map((chat) => {
            return (
                <ListItem button key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                    <ListItemIcon>
                        <Avatar alt="Remy Sharp" src={chat[1].userInfo.photoURL} />
                    </ListItemIcon>
                    <ListItemText 
                        primary={chat[1].userInfo.displayName}
                        secondary={
                            <React.Fragment>
                                {/* <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                                >
                                Ali Connors
                                </Typography> */}
                                {chat[1].lastMsg}
                            </React.Fragment>
                            }
                    ></ListItemText>
                </ListItem>
            )
        })}
        </>
        </List>
        </Paper> 
    )
}

export default ChatList;