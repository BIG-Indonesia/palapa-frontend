import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import './index.scss';

export const Kategori = ({ data, history }) => {
  if (data === null) {
    return (
      <div className="kategori ">
        <div className="kategori__loading">
          <PropagateLoader
            sizeUnit={"px"}
            size={10}
            color={'#fff'}
            loading={true}
          />
        </div>
      </div>
    );
  }
  if (data.length < 1) return null;
  return (
    <div className="kategori">
      <div className="container kategori__wrapper">
        <h2 className="kategori__header">
          <span className="kategori__header__line" />
          Kategori
        </h2>
        <div className="kategori__item-list">
          {data.map((item) => (
            <div key={item.label} className="kategori__item-wrapper">
              <a
                className="kategori__item"
                href="#kategori"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(item.link);
                  window.scrollTo(0, 0);
                }}
              >
                <span className="kategori__item__logo">
                  <img className="kategori__item__image" src={item.image} alt="" />
                </span>
                <span className="kategori__item__label">{item.label}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Kategori;
