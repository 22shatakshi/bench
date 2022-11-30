import React, { useContext } from 'react';
import { ChatContext } from '../../../context/ChatContext';
import { database } from "../../../config/firebase"
import { arrayUnion, deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { useAuth } from '../../../context/AuthContext';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


const Appbar = () => {
    const { data, dispatch } = useContext(ChatContext);
    const { user } = useAuth();

    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleReport = () => {
        let a = document.createElement('a');
        a.target = '_blank';
        // one long line
        a.href = "mailto:team23project@gmail.com?subject=Report%20A%20Chat&body=Report%20has%20been%20submitted%0A------------------------------------------------------------%0AReport%20chatId%20->%20" + data.chatId + "%0APlease%20describe%20the%20reason%20->%20%0A%0A";
        if (window.confirm('Report to admin: Do you want to open email?')) {
            a.click();
        };
    }

    const handleBlock = async () => {
        await updateDoc(doc(database, "userid", user.uid), {
            blocked: arrayUnion(data.user.uid)
        })
        await updateDoc(doc(database, "chatInfo", user.uid), {
            [data.chatId]: deleteField()
        })
        await updateDoc(doc(database, "chatInfo", data.user.uid), {
            [data.chatId]: deleteField()
        })
        await deleteDoc(doc(database, "chats", data.chatId));
        dispatch({type:"BLOCK_USER", payload: {}})
    }

    const handleClear = async () => {
        await updateDoc(doc(database, 'chats', data.chatId), {
            [user.uid]: []
        })
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleMenu}
                    >
                    <Avatar alt="Remy Sharp" src={data.user?.photoURL} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleBlock}>Block</MenuItem>
                        <MenuItem onClick={handleReport}>Report</MenuItem>
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {data.user?.displayName}
                    </Typography>
                    <Button color="inherit" onClick={handleClear}>Clear Chat</Button>
                    </Toolbar>
                </AppBar>
                </Box>
        </div>
    )
}

export default Appbar;
