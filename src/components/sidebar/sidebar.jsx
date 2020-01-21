import React, { Component } from 'react';
import bigD from '../../images/bigD_icon.png';
import Drawer from '../uiElements/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import LogoutIcon from '../uiElements/LogoutIcon';
import './sidebar.style.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleDrawerOpen() {
    this.setState({sidebarOpen: true});
  };

  handleDrawerClose() {
    this.setState({sidebarOpen: false});
  };

  render() {
    if (this.props.isLoggedIn) {
      return (
        <Drawer
        variant="persistent"
        anchor="left"
        open={ this.state.sidebarOpen }
        >
          <img src={ bigD } id='diabnext-favicon' alt='logo' />
          <List>
            <ListItem button key='logout' onClick={ this.props.logout }>
              <LogoutIcon />
            </ListItem>
          </List>
        </Drawer>
      )
    }
    else {
      return (
        <div>
        </div>
      )
    }
  }
}

export default Sidebar;
