import React, { useState } from 'react';
import Modal from 'react-modal';
import { Map, TileLayer, WMSTileLayer, ZoomControl } from 'react-leaflet';
import { Link } from "react-router-dom";
import config from '../../config';
import './index.scss';
import { MetadataPanel } from './components/metadata-panel';
import { mappingMetadata } from './helpers/mapping-metadata';

Modal.setAppElement('#root');

export const Dataset = ({
  title,
  kategori,
  author,
  image,
  identifier,
  downloadable,
  bbox
}) => {
  const defaultMapCenter = [ -6.175985, 106.827313 ];
  const [isMetadataOpen, setIsMetadataOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [metadata, setMetadata] = useState([]);
  const [mapBounds, setMapBounds] = useState(null);

  const getMetadata = () => {
    fetch(`${config.host}/csw?service=CSW&version=2.0.2&request=GetRecordById&ElementSetName=full&Id=${identifier}&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/json`)
      .then(res => res.json())
      .then(json => {
        const metadata = mappingMetadata(json);
        setMetadata(metadata);
        setIsMetadataOpen(true);
      });
  };

  const openMap = () => {
    setMapBounds(bbox);
    setIsMapOpen(true);
  };

  let downloadIcon = null;
  if (downloadable === 'Y') {
    downloadIcon = (
      <a
        href={`${config.api}/download_shape?layer=${identifier}`}
        className="dataset__actions-download"
      >
        <span className="icon-cloud-download" />
      </a>
    );
  }

  let mapProps = {};
  if (!mapBounds) {
    mapProps = {
      center: defaultMapCenter,
      zoom: 12,
      zoomControl: false,
    };
  } else {
    mapProps = {
      bounds: mapBounds,
      zoomControl: false,
    };
  }
  return (
    <div id={`dataset-${identifier}`}>
      <Modal
        isOpen={isMapOpen}
        onRequestClose={() => setIsMapOpen(false)}
      >
        <div className="dataset__map">
          <div className="dataset__map__header">
            <h3 className="dataset__map__title">{title}</h3>
            <span className="dataset__map__close" onClick={() => setIsMapOpen(false)}>
              <span className="icon-close" />
            </span>
          </div>
          <Map {...mapProps}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <WMSTileLayer
              layers={identifier}
              url={config.wms}
              transparent
              format="image/png"
            />
            <ZoomControl position="topleft" />
          </Map>
        </div>
      </Modal>
      <Modal
        isOpen={isMetadataOpen}
        onRequestClose={() => setIsMetadataOpen(false)}
      >
        <div className="dataset__metadata__header">
          <h3 className="dataset__metadata__title">{title}</h3>
          <span className="dataset__metadata__close" onClick={() => setIsMetadataOpen(false)}>
            <span className="icon-close" />
          </span>
        </div>
        <div className="dataset__metadata__content">
          {metadata.map((item, key) => <MetadataPanel key={key} {...item} />)}
        </div>
      </Modal>
      <div className="dataset">
        <div className="dataset__actions">
          <a
            href="#map"
            className="dataset__actions-map"
            onClick={(e) => {
              e.preventDefault();
              openMap();
            }}
          >
            <span className="icon-map" />
          </a>
          <a
            href="#info"
            className="dataset__actions-info"
            onClick={(e) => {
              e.preventDefault();
              getMetadata();
            }}
          >
            <span className="icon-info" />
          </a>
          {downloadIcon}
        </div>
        <div
          className="dataset__image-wrapper"
          onClick={(e) => {
            e.preventDefault();
            openMap();
          }}
        >
          <span className="dataset__image-aligner" />
          <img className="dataset__image" src={image} alt="" />
        </div>

        <Link className="dataset__kategori" to={`/pencarian?kategori=${kategori}`}>{kategori}</Link>
        <div className="dataset__title-wrapper">
          <a
            href="#info"
            className="dataset__title"
            onClick={(e) => {
              e.preventDefault();
              getMetadata();
            }}
          >
            {title}
          </a>
        </div>
        <Link className="dataset__author" to={`/pencarian?instansi=${author}`}>{author}</Link>
      </div>
    </div>
  );
}

export default Dataset;
