import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import './index.scss';

export const Berita = ({ data, clickHandler }) => {
  if (data === null) {
    return (
      <div className="berita">
        <div className="berita__loading">
          <PropagateLoader
            sizeUnit={"px"}
            size={10}
            color={'#e87171'}
            loading={true}
          />
        </div>
      </div>
    );
  }
  if (data.length < 1) return null;
  return (
    <div className="berita">
      <div className="container">
        <h2 className="berita__header">
          <span className="berita__header__line" />
          Berita Geoportal
        </h2>
        <div className="berita__items">
          <div className="berita__items__wrapper">
            {data.map((item, index) => (
              <div key={`berita-${index}`} className="berita__item">
                <h4 className="berita__item__tanggal">{item.date}</h4>
                <h3
                  className="berita__item__title"
                  onClick={() => {
                    clickHandler(item.id);
                    window.scrollTo(0, 0);
                    return false;
                  }}
                >
                  {item.title}
                </h3>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Berita;
