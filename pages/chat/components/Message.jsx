import React, { useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from "../../../context/AuthContext"
import { ChatContext } from "../../../context/ChatContext"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@material-ui/core/Grid';
import { color } from '@mui/system';

const useStyles = makeStyles({
    imageOwner: {
        width: 200,
        height: "auto",
        float: "right",
        borderRadius: '10px',
        margin: '5px',
        padding: '10px',
        display: 'inline-block',
        background: '#e5e5ea'     
    },
    notOwner: {
        width: 200,
        height: "auto",
        float: "left",
        borderRadius: '10px',
        margin: '5px',
        padding: '10px',
        display: 'inline-block',
        background: '#248bf5',
        color: '#ffffff'
    },
    leftmessage: {
        float: "left",
        borderRadius: '10px',
        margin: '5px',
        padding: '10px',
        display: 'inline-block',
        background: '#248bf5',
        color: '#ffffff'
    },
    rightmessage: {
        float: "right",
        borderRadius: '10px',
        margin: '5px',
        padding: '10px',
        display: 'inline-block',
        background: '#e5e5ea'
        
    },

});

const Message = ({message}) => {
    const classes = useStyles()
    const { user } = useAuth();
    const { data } = useContext(ChatContext)

    const ref = useRef();
    
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message])

    return (
        <ListItem key="1">
            <Grid container>
                <Grid item xs={12}>
                    {message.text &&
                    <p><ListItemText className={message.sender === user.uid ? classes.rightmessage : classes.leftmessage} primary={message.text}></ListItemText></p>
                    }
                    {message.text && message.file && <><br /><br/></>}
                    {message.file && <img
                        src={message.file} className={message.sender === user.uid ? classes.imageOwner : classes.notOwner} />}
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default Message;

