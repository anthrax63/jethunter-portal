// import external modules
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {
  // Moon,
  Menu,
  MoreVertical,
  User,
  LogOut
} from 'react-feather';
import {injectIntl} from 'react-intl';

import userImage from '../../../assets/img/avatar_mock.png';
import ReactCountryFlag from 'react-country-flag';

const iconsMap = {
  en: 'us',
  ru: 'ru'
};

class ThemeNavbar extends Component {
  handleClick = (e) => {
    this.props.toggleSidebarMenu('open');
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = () => {
    this.props.logout();
  };

  handleLocaleSwitch = (locale) => {
    this.props.setLocale(locale);
  };

  render() {
    return (
      <Navbar className="navbar navbar-expand-lg navbar-light bg-faded">
        <div className="container-fluid px-0">
          <div className="navbar-header">
            <Menu
              size={14}
              className="navbar-toggle d-lg-none float-left"
              onClick={this.handleClick.bind(this)}
              data-toggle="collapse"
            />
            {/* <Moon size={20} color="#333" className="m-2 cursor-pointer"/> */}
            <MoreVertical
              className="mt-1 navbar-toggler black no-border float-right"
              size={50}
              onClick={this.toggle}
            />
          </div>

          <div className="navbar-container">
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto float-right" navbar>
                <UncontrolledDropdown nav inNavbar className="pr-1">
                  <DropdownToggle nav>
                    <ReactCountryFlag code={iconsMap[this.props.intl.locale]} svg/> {this.props.intl.locale.toUpperCase()}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.handleLocaleSwitch.bind(this, 'en')}>
                      <ReactCountryFlag code={iconsMap['en']} svg/> English
                    </DropdownItem>
                    <DropdownItem onClick={this.handleLocaleSwitch.bind(this, 'ru')}>
                      <ReactCountryFlag code={iconsMap['ru']} svg/> Русский
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar className="pr-1">
                  <DropdownToggle nav>
                    <img src={userImage} alt="logged-in-user" className="rounded-circle width-35"/>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <span className="font-small-3">{`${this.props.firstName} ${this.props.lastName}`}</span>
                    </DropdownItem>
                    <DropdownItem divider/>

                    <Link to="/profile" className="p-0">
                      <DropdownItem>
                        <User size={16} className="mr-1"/> My Profile
                      </DropdownItem>
                    </Link>
                    <Link to="/signin" className="p-0">
                      <DropdownItem onClick={this.handleLogout}>
                        <LogOut size={16} className="mr-1"/> Logout
                      </DropdownItem>
                    </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </div>
        </div>
      </Navbar>
    );
  }
}

export default injectIntl(ThemeNavbar);
