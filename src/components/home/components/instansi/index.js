import React from 'react';
import Slider from "react-slick";
import PropagateLoader from 'react-spinners/PropagateLoader';

import './index.scss';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const Instansi = ({
  title,
  data,
  isSmall,
  isMedium,
  history
}) => {
  if (data === null) {
    return (
      <div className="instansi">
        <div className="instansi__loading">
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

  let numItems = 6;
  if (isSmall) numItems = 3;
  if (isMedium) numItems = 5;

  const settings = {
    dots: true,
    infinite: (data.length > numItems) ? true : false,
    speed: 500,
    slidesToShow: numItems,
    slidesToScroll: numItems,
    rows: 1,
    autoplaySpeed: 2000,
    autoplay: true,
    arrows: false,
  };
  return (
    <div className="instansi">
      <div className="container instansi__wrapper">
        <h2 className="instansi__header">
          <span className="instansi__header__line" />
          Instansi
        </h2>
        <Slider {...settings}>
          {data.map((item, index) => (
            <div key={`carousel-${title}-${index}`} className="instansi__item-wrapper">
              <a
                className="instansi__item"
                href="#instansi"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(item.url);
                  window.scroll(0, 0);
                }}
              >
                <span className="instansi__item__logo">
                  <span className="instansi__item__image-aligner" />
                  <img className="instansi__item__image" src={item.image} alt="" />
                </span>
                <span className="instansi__item__label">{item.label}</span>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Instansi;
