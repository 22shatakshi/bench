import React, { useContext } from 'react';
import { useAuth } from "../../../context/AuthContext"
import { ChatContext } from "../../../context/ChatContext"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const Message = ({message}) => {
    const { user } = useAuth();
    const { data } = useContext(ChatContext)

    return (
        <ListItem key="1">
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText style={{float: message.sender === user.uid ? "right" : "left"}} primary={message.text}></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default Message;