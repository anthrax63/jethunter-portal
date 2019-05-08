// import external modules
import React, {Component} from 'react';

import {
  Home,
  User
} from 'react-feather';
import {NavLink} from 'react-router-dom';

// Styling
import '../../../../assets/scss/components/sidebar/sidemenu/sidemenu.scss';
// import internal(own) modules
import SideMenu from '../sidemenuHelper';
import {defineMessages, FormattedMessage} from 'react-intl';

const messages = defineMessages({
  dashboard: {
    id: 'sideMenu.dashboard',
    defaultMessage: 'Dashboard'
  },
  profile: {
    id: 'sideMenu.profile',
    defaultMessage: 'Profile'
  }
});

class SideMenuContent extends Component {
  render() {
    return (
      <SideMenu className="sidebar-content" toggleSidebarMenu={this.props.toggleSidebarMenu}>
        <SideMenu.MenuSingleItem>
          <NavLink to="/dashboard" activeClassName="active">
            <i className="menu-icon">
              <Home size={18} />
            </i>
            <span className="menu-item-text"><FormattedMessage {...messages.dashboard} /></span>
          </NavLink>
        </SideMenu.MenuSingleItem>
        <SideMenu.MenuSingleItem>
          <NavLink to="/profile" activeClassName="active">
            <i className="menu-icon">
              <User size={18} />
            </i>
            <span className="menu-item-text"><FormattedMessage {...messages.profile} /></span>
          </NavLink>
        </SideMenu.MenuSingleItem>
      </SideMenu>
    );
  }
}

export default SideMenuContent;
