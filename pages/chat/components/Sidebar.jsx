import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Search from "./Search"
import ChatList from './ChatList'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { useAuth } from "../../../context/AuthContext";

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

const Sidebar = () => {
  const classes = useStyles();
  const { user } = useAuth();
    
  return (  
    <div className="sidebar">
        <List>
            <ListItem key="currentUser">
                <ListItemIcon>
                    <Avatar alt="Remy Sharp" src={user.photoURL} />
                </ListItemIcon>
                <ListItemText primary={user.displayName}></ListItemText>
            </ListItem>
        </List>
      <Grid container component={Paper} className={classes.chatSection}>
        <Search/>
        <ChatList/>
      </Grid>
    </div>
  );
};

export default Sidebar;