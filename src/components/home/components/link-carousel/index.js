import React from 'react';
import Slider from "react-slick";
import PropagateLoader from 'react-spinners/PropagateLoader';

import './index.scss';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const LinkCarousel = ({
  title,
  data,
  isSmall,
  isMedium
}) => {
  if (data === null) {
    return (
      <div className="link-carousel">
        <div className="link-carousel__loading">
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

  let numItems = 5;
  if (isSmall) numItems = 2;
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
    <div className="link-carousel">
      <div className="container link-carousel__wrapper">
        <h2 className="link-carousel__header">
          <span className="link-carousel__header__line" />
          {title}
        </h2>
        <Slider {...settings}>
          {data.map((item, index) => (
            <div key={`carousel-${title}-${index}`} className="link-carousel__item-wrapper">
              <a
                className="link-carousel__item"
                href={item.url}
                title={item.label}
              >
                <span className="link-carousel__item__logo">
                  <span className="link-carousel__item__image-aligner" />
                  <img className="link-carousel__item__image" src={item.image} alt="" />
                </span>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default LinkCarousel;
