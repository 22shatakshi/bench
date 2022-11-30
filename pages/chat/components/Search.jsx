import React from 'react'
import { useState, useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { database } from '../../../config/firebase';
import { useAuth } from '../../../context/AuthContext';
import { getDoc, doc, setDoc, updateDoc, onSnapshot} from 'firebase/firestore';
import { ChatContext } from '../../../context/ChatContext';

const Search = () => {
    const [err, setErr] = useState("");
    const [text, setText] = useState("");
    const [displayList, setDisplayList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const { user } = useAuth();
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getSearchList = () => {

            const unsub = onSnapshot(doc(database, "chatInfo", user.uid), (doc) => {
                setSearchList(Object.entries(doc.data()));
            });
            return () => {
                unsub();
            }
        }

        user.uid && getSearchList();
    }, [user.uid])

    const handleSearch = () => {
        const list = searchList?.filter(u => u[1]?.userInfo.displayName === text );
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

    const handleSelect = async (selectedInfo) => {
        const selected = selectedInfo[1].userInfo
        const combinedId = user.uid > selected.uid ? user.uid + selected.uid : selected.uid + user.uid;
        const res = await getDoc(doc(database, "chats", combinedId));
        try {
            if (!res.exists()) {
                //create user chats
                await setDoc(doc(database, "chats", combinedId), {
                    id: combinedId,
                    messages: [],
                    [user.uid]: [],
                    [selected.uid]: [],
                });
                await updateDoc(doc(database, "chatInfo", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: selected.uid,
                        displayName: selected.displayName,
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
            dispatch({type:"CHANGE_USER", payload: selected})
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
                        <Avatar src={result[1].userInfo.photoURL} />
                    </ListItemIcon>
                    <ListItemText primary={result[1].userInfo.displayName}></ListItemText>
                    </ListItem>
                )})}  
            </>          
        </div>
    )
}

export default Search