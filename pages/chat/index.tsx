import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import currentUserDataRequest from '../../data/currectUser';
import userlistRequest from '../../data/userList';
import { getDoc, doc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { database } from '../../config/firebase'

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

const Chat = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userList, setUserList] = useState<any[]>([]);
  const [chatTarget, setChatTarget] = useState<any>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("")
  const [target, setTarget] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async() => {
        const data = await currentUserDataRequest();
        setCurrentUser(data);
        const users = await userlistRequest();
        setUserList(users);
        setLoading(false);
        console.log(userList)
    }
    fetchData();
  }, [])

  const handleSearch = () => {
    const targetUsers = userList?.filter(u => u?.username === text || u?.name === text);
    if (targetUsers.length == 0) {
        setTarget([]);
        setError("No user found");
    }
    else {
        setTarget(targetUsers)
        setError("");
    }
    console.log(targetUsers)
  }

  const handleKeyDown = (e: any) => {
    e.code === "Enter" && handleSearch();
  }

//   const handleSelect = async (user: any) => {
//     //check whether the group exists or not in firestore
//     setTarget(user);
//     const combinedId = userData.uid > user.uid
//     ? userData.uid + user.uid
//     : user.uid + userData.uid;
//     try {
//         const res = await getDoc(doc(database, "chats", combinedId));
//         //if does not exist, create chats
//         if (!res.exists()) {
//             await setDoc(doc(database, "chats", combinedId), { messages: [] });
//         }
//         await updateDoc(doc(database, "userChats", userData.uid), {
//             [combinedId + ".userInfo"]: {
//               uid: user.uid,
//               displayName: user.name,
//               //photoURL: user.photoURL,
//             },
//             [combinedId + ".date"]: serverTimestamp(),
//           });
  
//           await updateDoc(doc(database, "userChats", user.uid), {
//             [combinedId + ".userInfo"]: {
//               uid: userData.uid,
//               displayName: userData.name,
//               //photoURL: currentUser.photoURL,
//             },
//             [combinedId + ".date"]: serverTimestamp(),
//           });
//     } catch (err) {
//         console.log(err);
//     }
//   }


  return (
      <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container>
        {loading ? (
            <div> Loading </div>
        ) : (
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <>
                <List>
                    <ListItem button key="currentUser">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary={currentUser.name}></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth value={text} onKeyDown={handleKeyDown} onChange={e=>setText(e.target.value)}/>
                    <div> {error} </div>
                    <>
                    {target?.length > 0 && target?.map((result) => {
                    return (
                        <ListItem button>
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary={result.name}>{result.name}</ListItemText>
                        <ListItemText secondary={result.status} style={{float:"right"}}></ListItemText>
                        </ListItem>
                    )})}  
                    </>          
                </Grid>
                <Divider />
                <Paper style={{maxHeight: 430, overflow: 'auto'}}>
                <List >
                <>
                {userList?.length > 0 && userList?.map((user) => {
                    if (user.uid != currentUser.uid) {
                        return (
                            <ListItem button key={user.uid}>
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                                </ListItemIcon>
                                <ListItemText primary={user.name}>{user.name}</ListItemText>
                                <ListItemText secondary={user.status} style={{float:"right"}}></ListItemText>
                            </ListItem>
                            )
                        }
                })}
                </>
                </List>
                </Paper>
                </>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText style={{float:"right"}} primary="Hey man, What's up ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText style={{float:"right"}} secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText style={{float:"left"}} primary="Hey, Iam Good! What about you ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText style={{float:"left"}} secondary="09:31"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText style={{float:"right"}} primary="Cool. i am good, let's catch up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText style={{float:"right"}} secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={1} style={{float:"right"}}>
                        <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        )}
        </Grid>
      </div>
  );
}

export default Chat;
