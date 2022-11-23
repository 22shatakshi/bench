import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import React from 'react'
import Sidebar from './components/Sidebar'
import Dialogue from './components/Dialogue'

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

const ChatPage = () => {
  const classes = useStyles();
  return (
    <div className='chatPage'>
      <div className="container">
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={3} className={classes.borderRight500}>
            <Sidebar/>
          </Grid>
          <Grid item xs={9}>
            <Dialogue/>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default ChatPage


