import React, { useState } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import queryString from 'query-string';
import Header from '../../library/header';
import { Carousel } from './components/carousel';
import { Kategori } from './components/kategori';
import { Instansi } from './components/instansi';
import { ListDataset } from './components/list-dataset';
import { Footer } from '../../library/footer';
import { useMedia } from '../../helpers/use-media';
import { fetchSettings } from '../../helpers/fetchSettings';
import { fetchBanners } from '../../helpers/fetchBanners';
import { fetchKategori } from '../../helpers/fetchKategori';
import { fetchInstansi } from '../../helpers/fetchInstansi';
import { fetchDataset } from '../../helpers/fetchDataset';
import { addCountInstansi } from './helpers/add-count-instansi';
import { addCountKategori } from './helpers/add-count-kategori';
import { Pagination, paginateDataset } from './components/pagination';
import { findMaxExtent } from '../../helpers/find-dataset-maxextent';
import { filterDataset } from './helpers/filter-dataset';
import './index.scss';

let filter;

const onChangeMap = ({e,  history}) => {
  const map = e.target;
  const curBounds =  map.getBounds();
  const south = curBounds.getSouth();
  const west = curBounds.getWest();
  const east = curBounds.getEast();
  const north = curBounds.getNorth();
  const nextFilter = {
    ...filter,
    bounds: [[south, west], [north, east]]
  };
  history.push(`/pencarian?${queryString.stringify(nextFilter)}`);
};

const Pencarian = ({ location, history }) => {
  filter = queryString.parse(location.search);
  const currentPage = filter.page || 1;
  delete filter.page;
  const [ keyword, setKeyword ] = useState(filter.keyword);
  const dataSettings = fetchSettings();
  const dataBanner = fetchBanners();
  const dataInstansi = fetchInstansi();
  const dataKategori = fetchKategori();
  const dataDataset = fetchDataset();

  const finalDataKategori = addCountKategori(dataKategori, dataDataset);
  const finalDataInstansi = addCountInstansi(dataInstansi, dataDataset);

  let mapBounds = findMaxExtent(dataDataset);
  let filterMapProps;
  let map = null;
  if (mapBounds) {
    if (filter.bounds) {
      const filterBoundsX1 = filter.bounds[0].split(',');
      const filterBoundsX2 = filter.bounds[1].split(',');
      mapBounds = [
        [parseFloat(filterBoundsX1[0]), parseFloat(filterBoundsX1[1])],
        [parseFloat(filterBoundsX2[0]), parseFloat(filterBoundsX2[1])]
      ];
    }
    filterMapProps = {
      bounds: mapBounds,
      zoomControl: false
    };

    map = (
      <Map
        {...filterMapProps}
        onMoveend={(e) => onChangeMap({e, history})}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomControl position="topleft" />
      </Map>
    );
  }

  let filteredDataset = filterDataset({
    dataset: dataDataset,
    filter,
    mapBounds
  });

  let datasetLength = (filteredDataset) ? filteredDataset.length : 0;

  const paginatedDataset = paginateDataset({
    dataset: filteredDataset,
    page: currentPage
  });

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
      <div className="pencarian">
        <div className="pencarian__banner">
          <Carousel images={dataBanner.images} />
          <div className="pencarian__banner__overlay">
            <div className="container">
              <h2>Pencarian Data</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="pencarian__filter">
            <h3>Filter Pencarian</h3>
            <div className="pencarian__panel">
              <h4>Batas Pencarian</h4>
              <div className="pencarian__peta">
                {map}
              </div>
              <Kategori data={finalDataKategori} filter={filter} history={history} />
              <Instansi data={finalDataInstansi} filter={filter} history={history} />
            </div>
          </div>
          <div className="pencarian__content">
            <div className="pencarian__input-wrapper">
              <a
                href="#submit-search"
                className="pencarian__submit"
                onClick={(e) => {
                  e.preventDefault();
                  const nextFilter = { ...filter, keyword };
                  const query = queryString.stringify(nextFilter);
                  history.push(`/pencarian?${query}`);
                }}
              >
                <span className="icon-magnifier" />
              </a>
              <span
                className="pencarian__clear"
                style={{
                  display: (keyword && keyword.length > 0) ? 'block' : 'none'
                }}
                onClick={() => {
                  setKeyword('');
                  document.getElementById('pencarian__input').focus();
                }}
              >
                <span className="icon-close" />
              </span>
              <input
                id="pencarian__input"
                type="text"
                placeholder="Kata Kunci"
                className="pencarian__input"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const nextFilter = { ...filter, keyword };
                    const query = queryString.stringify(nextFilter);
                    history.push(`/pencarian?${query}`);
                  }
                }}
              />
            </div>
            <div className="pencarian__dataset__list">
              <ListDataset data={paginatedDataset} />
            </div>
            <Pagination
              datasetLength={datasetLength}
              currentPage={currentPage}
              filter={filter}
              history={history}
            />
          </div>
        </div>
        <Footer dataSettings={dataSettings} />
      </div>
    </div>
  );
};

export default Pencarian;
