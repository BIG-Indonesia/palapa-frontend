import React, { useState, useEffect } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import Header from '../../library/header';
import { useMedia } from '../../helpers/use-media';
import './index.css';
import { fetchSettings } from '../../helpers/fetchSettings';

const Jelajah = () => {
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() =>{
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  const dataSettings = fetchSettings();
  const isSmall = useMedia("(max-width: 760px)");
  const isMedium = useMedia("(min-width: 760px) and (max-width : 1160px)");
  let className = '';
  if (isSmall) {
    className = 'layout-small';
  } else if (isMedium) {
    className = 'layout-medium';
  }
  return (
    <div className={className}>
      <Header
        logo={dataSettings.logo}
        organization={dataSettings.organization}
      />
      <div className="jelajah" style={{ height }}>
        <Map center={[ -6.175985, 106.827313 ]} zoom={12} zoomControl={false}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />
        </Map>
      </div>
    </div>
  );
};

export default Jelajah;
