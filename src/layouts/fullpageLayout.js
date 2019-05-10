import React from 'react';
import templateConfig from '../templateConfig';
import classnames from 'classnames';
import Logo from '../assets/img/logo.png';


const FullPageLayout = ({children, ...rest}) => {
  return (
    <div
      className="login-layout wrapper"
      style={{background: `url(${templateConfig.backgroundImageURL})`, backgroundSize: 'cover', height: '100%'}}
    >
      <div style={{textAlign: 'center'}}>
        <img src={Logo} alt="logo"/>
      </div>
      <main className="main text-muted">{children}</main>
    </div>
  );
};

export default FullPageLayout;
