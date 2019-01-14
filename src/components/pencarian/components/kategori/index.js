import React from 'react';
import queryString from 'query-string';
import PropagateLoader from 'react-spinners/PropagateLoader';

export const Kategori = ({ data, filter, history }) => {
  if (data === null) return (
    <div>
      <h4>Kategori</h4>
      <div className="pencarian__loading">
        <PropagateLoader
          sizeUnit={"px"}
          size={10}
          color={'#e87171'}
          loading={true}
        />
      </div>
    </div>
  );
  return (
    <div>
      <h4>Kategori</h4>
      <ul>
        {data.map((item) => {
          let className;
          let clickFilter = { ...filter };

          if (filter.kategori) {
            className = 'pencarian__filter-inactive';
            if (Array.isArray(filter.kategori)) {
              const kategoriFilterForClick = [];
              filter.kategori.map((kat) => {
                if (kat === item.label) {
                  className = 'pencarian__filter-active';
                } else {
                  kategoriFilterForClick.push(kat);
                }
                return kat;
              });
              if (className === 'pencarian__filter-active') {
                clickFilter.kategori = kategoriFilterForClick;
              } else {
                clickFilter.kategori = [
                  ...clickFilter.kategori,
                  item.label
                ];
              }
            } else {
              if (filter.kategori === item.label) {
                className = 'pencarian__filter-active';
                delete clickFilter.kategori;
              } else {
                clickFilter.kategori = [
                  filter.kategori,
                  item.label
                ];
              }
            }
          } else {
            clickFilter.kategori = item.label;
          }
          const query = queryString.stringify(clickFilter)
          return (
            <li
              key={item.label}
              className={className}
              onClick={() => {
                history.push('/pencarian?' + query);
              }}
            >
              <span className="pencarian__filter-item">{item.label}</span>
              <span className="pencarian__filter-count">{item.count}</span>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default Kategori;
