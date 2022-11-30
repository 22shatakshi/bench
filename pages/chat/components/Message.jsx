import React, { useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from "../../../context/AuthContext"
import { ChatContext } from "../../../context/ChatContext"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    imageOwner: {
      width: 200,
      height: "auto",
      float: "right",
    },
    notOwner: {
      width: 200,
      height: "auto",
      float: "left",
    }
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
                    <p><ListItemText style={{float: message.sender === user.uid ? "right" : "left"}} primary={message.text}></ListItemText></p>
                    {message.file && <img
                        src={message.file} className={message.sender === user.uid? classes.imageOwner : classes.notOwner}
                    />}
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default Message;