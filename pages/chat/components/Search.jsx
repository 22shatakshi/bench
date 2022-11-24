import React from 'react'
import { useState, useContext } from 'react';
import userListRequest from "../../../data/userList"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { database } from '../../../config/firebase';
import { useAuth } from '../../../context/AuthContext';
import { getDoc, doc, setDoc, updateDoc, } from 'firebase/firestore';
import { ChatContext } from '../../../context/ChatContext';
import Paper from '@material-ui/core/Paper';

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

const Search = () => {
    const classes = useStyles();
    const [err, setErr] = useState("");
    const [text, setText] = useState("");
    const [displayList, setDisplayList] = useState([]);
    const { user } = useAuth();
    const { dispatch } = useContext(ChatContext);


    const handleSearch = async () => {
        //change this to matched users
        const userList = await userListRequest();
        const list = userList?.filter(u => u?.username === text || u?.name === text);
        if (list.length == 0) {
            setDisplayList([]);
            setErr("No User Found")
        }
        else {
            setDisplayList(list)
            setErr("");
        }
        console.log(list)
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async (selected) => {
        
        const combinedId = user.uid > selected.uid ? user.uid + selected.uid : selected.uid + user.uid;
        const res = await getDoc(doc(database, "chats", combinedId));
        try {
            if (!res.exists()) {
                console.log("create new chat")
                //create user chats
                await setDoc(doc(database, "chats", combinedId), {
                    id: combinedId,
                    messages: [],
                });
                await updateDoc(doc(database, "chatInfo", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: selected.uid,
                        displayName: selected.name,
                        photoURL: selected.photoURL,
                    },
                }); 
                await updateDoc(doc(database, "chatInfo", selected.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                });      
            }
            dispatch({type:"CHANGE_USER", payload: {uid: selected.uid, displayName: selected.name}})
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth value={text} onKeyDown={handleKey} onChange={e=>setText(e.target.value)}/>
                    <div> {err} </div>
                    <>
                {displayList?.length > 0 && displayList?.map((result) => {
                    return (
                        <ListItem button onClick={() => handleSelect(result)}>
                        <ListItemIcon>
                            <Avatar alt={result.name} src={result.photoURL} />
                        </ListItemIcon>
                        <ListItemText primary={result.name}></ListItemText>
                        <ListItemText secondary={result.status} style={{float:"right"}}></ListItemText>
                        </ListItem>
                    )})}  
                </>          
        </div>
    )
}

export default Search