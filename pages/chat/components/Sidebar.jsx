import React from "react";
import Search from "./Search"
import ChatList from './ChatList'
import RequestList from './RequestList'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { useAuth } from "../../../context/AuthContext";

const Sidebar = () => {
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
        <Search/>
        <RequestList/>
        <ChatList/>
    </div>
  );
};

export default Sidebar;