import React, { useState } from 'react';
import {
  Map,
  TileLayer,
  ZoomControl,
  // Rectangle,
} from 'react-leaflet';
import queryString from 'query-string';
import Select from 'react-select';

import Header from '../../library/header';

import { Carousel } from './components/carousel';
import { DatasetTerbaru } from './components/dataset-terbaru';
import { Kategori } from './components/kategori';
import { Instansi } from './components/instansi';
import { LinkCarousel } from './components/link-carousel';
import { Berita } from './components/berita';
import { Footer } from '../../library/footer';
import './index.scss';
import 'simple-line-icons/css/simple-line-icons.css'
import { useMedia } from '../../helpers/use-media';
import { fetchSettings } from '../../helpers/fetchSettings';
import { fetchBerita } from '../../helpers/fetchBerita';
import { fetchDataset } from '../../helpers/fetchDataset';
import { fetchKategori } from '../../helpers/fetchKategori';
import { fetchInstansi } from '../../helpers/fetchInstansi';
import { fetchBanners } from '../../helpers/fetchBanners';
import { fetchWeb } from './helpers/fetchWeb';
import { findMaxExtent } from '../../helpers/find-dataset-maxextent';

let advancedFilter = {};

const onChangeMap = ({e,  history}) => {
  const map = e.target;
  const curBounds =  map.getBounds();
  const south = curBounds.getSouth();
  const west = curBounds.getWest();
  const east = curBounds.getEast();
  const north = curBounds.getNorth();
  advancedFilter.bounds = [[south, west], [north, east]]
};
export const Home = ({ history }) => {
  const [ keyword, setKeyword ] = useState('');
  const dataSettings = fetchSettings();
  const dataBanner = fetchBanners();
  const dataset = fetchDataset();
  const datasetTerbaru = (dataset === null) ? null : dataset.slice(0, 4);
  const dataKategori = fetchKategori();
  const dataInstansi = fetchInstansi();
  const dataWeb = fetchWeb();
  const dataBerita = fetchBerita();

  const [isAdvanceActive, setAdvanceActive] = useState(false);

  let mapBounds = findMaxExtent(dataset);
  let map = null;
  if (mapBounds && isAdvanceActive && map == null) {
        // <Rectangle bounds={mapBounds} color="red" />
    map = (
      <Map
        bounds={mapBounds}
        zoomControl={false}
        onMoveend={(e) => onChangeMap({e, history})}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topleft" />
      </Map>
    );
  }

  const isSmall = useMedia("(max-width: 760px)");
  const isMedium = useMedia("(min-width: 760px) and (max-width : 1160px)");
  let searchClassName = 'search';
  if (isAdvanceActive) {
    searchClassName = 'search search-active';
  }

  const selectColorStyles = {
    control: styles => ({ ...styles,
      borderRadius: 0,
      height: isSmall ? 40 : 60,
      backgroundColor: '#f1f1f1',
    }),
  };

  let mapHeight = 650;
  let className = '';
  if (isSmall) {
    mapHeight = 200;
    className = 'layout-small';
  } else if (isMedium) {
    className = 'layout-medium';
    mapHeight = 400;
  }
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!isAdvanceActive) {
      if (keyword) {
        history.push(`/pencarian?keyword=${keyword}`);
        window.scroll(0,0);
      }
    } else {
      const params = queryString.stringify(advancedFilter);
      history.push(`/pencarian?${params}`);
      window.scroll(0,0);
    }
  }

  return (
    <div className={className}>
      <Header
        logo={dataSettings.logo}
        organization={dataSettings.organization}
      />
      <div className="home">
        <div className="banner">
          <Carousel images={dataBanner.images} />
          <div className="banner__overlay" />
        </div>
        <div className="home__search">
          <div className="container">
            <p className="home__search__intro">{dataBanner.tagline}</p>
            <div id="cari" className={searchClassName}>
              <a
                href="#cari"
                className="search__advanced-link"
                onClick={() => {
                  window.dispatchEvent(new Event('resize'));
                  setAdvanceActive(!isAdvanceActive);
                }}
              >
                <span className="icon-settings" />
              </a>
              <span className="search__submit-wrapper">
                <a
                  href="#submit-search"
                  className="search__submit"
                  onClick={(e) => handleSearchSubmit(e)}
                >
                  <span className="icon-magnifier" />
                </a>
              </span>
              <div className="search__select-wrapper">
                <div className="search__select-kategori">
                  <Select
                    placeholder="Semua Kategori"
                    options={dataKategori || []}
                    styles={selectColorStyles}
                    onChange={(e) => {
                      advancedFilter.kategori = e.value;
                    }}
                  />
                </div>
                <div className="search__select-walidata">
                  <Select
                    placeholder="Semua Instansi"
                    options={dataInstansi || []}
                    styles={selectColorStyles}
                    onChange={(e) => {
                      advancedFilter.instansi = e.value;
                    }}
                  />
                </div>
              </div>
              <span className="search__input-wrapper">
                <input
                  type="text"
                  placeholder="Kata Kunci"
                  className="search__input"
                  value={keyword}
                  onChange={e => {
                    advancedFilter.keyword = e.target.value;
                    setKeyword(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit(e);
                    }
                  }}
                />
              </span>
              <div className="search__map-wrapper" style={{ height: isAdvanceActive ? mapHeight : 0}}>
                <div className="search__map">
                  {map}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DatasetTerbaru data={datasetTerbaru} />
      <Kategori data={dataKategori} history={history} />
      <Instansi
        history={history}
        data={dataInstansi}
        isSmall={isSmall}
        isMedium={isMedium}
      />
      <LinkCarousel
        title="Web GIS"
        data={dataWeb}
        isSmall={isSmall}
        isMedium={isMedium}
      />
      <Berita
        data={dataBerita}
        clickHandler={(id) => history.push(`/berita/${id}`)}
      />
      <Footer dataSettings={dataSettings} />
    </div>
  );
};

export default Home;
