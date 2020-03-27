import React, { useState  } from 'react';
import { Link, NavLink } from "react-router-dom";
import './index.scss';

const Header = ({
  organization = '',
  logo = ''
}) => {
  const [isNavActive, setNavActive] = useState(false);
  let headerClassName = 'header';
  if (isNavActive) {
    headerClassName = 'header header-active';
  }

  return (
    <div className={headerClassName}>
      <div className="container">
        <div className="header__logo">
          <Link to={`/`}><img src={logo} alt="" /></Link>
          <h1><Link to={`/`}>{`Geoportal ${organization}`}</Link></h1>
          <div
            className="header__nav-handle"
            onClick={() => setNavActive(!isNavActive)}
          >
            <span className="icon-list" />
          </div>
        </div>
        <div className="header__nav">
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
          <a href="/jelajah/">Jelajah</a>
          <NavLink activeClassName="active" to="/pencarian/">Pencarian</NavLink>
          <a href="/gspalapa/">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Header;
