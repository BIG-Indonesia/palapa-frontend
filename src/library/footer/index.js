import React from 'react';
import './index.scss';

export const Footer = ({ dataSettings = {}}) => {
  let email = null;
  let phone = null;
  let fax = null;
  if (dataSettings.email) {
    email = <p>Email: {dataSettings.email}</p>
  }
  if (dataSettings.phone) {
    phone = <p>Telp: {dataSettings.phone}</p>
  }
  if (dataSettings.fax) {
    fax = <p>Cax: {dataSettings.fax}</p>
  }
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__didukung">
          <h3 className="footer__header">Didukung Oleh</h3>
          <div className="footer__logo">
            <a className="footer__logo__item" href="/">
              <img src="/assets/images/logo-big.png" alt="BIG" />
            </a>
            <a className="footer__logo__item" href="/">
              <img src={dataSettings.logo} alt="" />
            </a>
          </div>
        </div>
        <div className="footer__kontak">
          <h3 className="footer__header">Kontak Kami</h3>
          <p>
            {dataSettings.organization}<br />
            {dataSettings.address}
          </p>
          {email}
          {phone}
          {fax}
        </div>
        <div className="footer__tentang">
          <h3 className="footer__header">Tentang Kami</h3>
          <p>{dataSettings.tentangkami}</p>
          <p>&copy; 2018 Badan Informasi Geospasial All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
