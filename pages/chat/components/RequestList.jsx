import { database } from "../../../config/firebase";
import { useEffect, useState } from 'react';
import { useAuth } from "../../../context/AuthContext";
import { doc, updateDoc, deleteField, Timestamp, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { IconButton } from "@material-ui/core";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

const RequestList = () => {
    const { user } = useAuth();
    const [list, setList] = useState([]);
    const docRef = doc(database, "chatRequest", user.uid);
    useEffect(() => {
        const getRequestList = () => {
            const unsub = onSnapshot(docRef, (doc)=>{
                doc.exists() && setList(Object.entries(doc.data()));
            })
            return () => {
                unsub()
            };
        }
        user.uid && getRequestList();
    }, [user.uid])

    const handleAccept = async (selected) => {
        const combinedId = user.uid > selected.uid ? user.uid + selected.uid : selected.uid + user.uid;
        const res = await getDoc(doc(database, "chats", combinedId));
        console.log(res.exists())
        console.log(combinedId)
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
                        timestamp: Timestamp.now(),             
                    },
                    [combinedId + ".lastMsg"]: selected.displayName + "has accepted your request.",
                }); 
                await updateDoc(doc(database, "chatInfo", selected.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        timestamp: Timestamp.now(),
                    },
                    [combinedId + ".lastMsg"]: user.displayName + "has accepted your request.",
                });      
            }
        } catch (error) {
            console.log(error);
        }
        await updateDoc(docRef, {
            [selected.uid]: deleteField()
        })

        
    }

    const handleDeny = async (selected) => {
        console.log(selected.uid)
        await updateDoc(docRef, {
            [selected.uid]: deleteField()
        })
    }

    return (
        <List>
            {list?.map((result) =>  {
                return (
                    <ListItem>
                    <ListItemIcon>
                        <Avatar alt="Remy Sharp" src={result[1].photoURL} />
                    </ListItemIcon>
                    <ListItemText 
                        primary={result[1].displayName}
                    ></ListItemText>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleAccept(result[1])}>
                        <DoneIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeny(result[1])}>
                        <ClearIcon />
                    </IconButton>
                </ListItem> 
                )
            })}
             
        </List>
    )
}

export default RequestList;