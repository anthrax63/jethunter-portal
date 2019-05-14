// import external modules
import React, {Component} from 'react';

import {
  Home,
  User,
  ChevronRight,
  BarChart2,
  Facebook
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
  },
  salesChannels: {
    id: 'sideMenu.salesChannels',
    defaultMessage: 'Sales channels'
  },
  facebook: {
    id: 'sideMenu.facebook',
    defaultMessage: 'Facebook'
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

        <SideMenu.MenuMultiItems
          name={<FormattedMessage {...messages.salesChannels} />}
          Icon={<BarChart2 size={18} />}
          ArrowRight={<ChevronRight size={16} />}
          collapsedSidebar={this.props.collapsedSidebar}
        >
          <NavLink to="/salesChannels/facebook" className="item" activeClassName="active">
            <i className="menu-icon">
              <Facebook size={18} />
            </i>
            <span className="menu-item-text"><FormattedMessage {...messages.facebook} /></span>
          </NavLink>
        </SideMenu.MenuMultiItems>

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
