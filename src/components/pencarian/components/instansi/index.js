import React from 'react';
import queryString from 'query-string';
import PropagateLoader from 'react-spinners/PropagateLoader';

export const Instansi = ({ data, filter, history }) => {
  if (data === null) return (
    <div>
      <h4>Instansi</h4>
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
      <h4>Instansi</h4>
      <ul>
        {data.map((item) => {
          let className;
          let clickFilter = { ...filter };

          if (filter.instansi) {
            className = 'pencarian__filter-inactive';
            if (Array.isArray(filter.instansi)) {
              const instansiFilterForClick = [];
              filter.instansi.map((ins) => {
                if (ins === item.label) {
                  className = 'pencarian__filter-active';
                } else {
                  instansiFilterForClick.push(ins);
                }
                return ins;
              });
              if (className === 'pencarian__filter-active') {
                clickFilter.instansi = instansiFilterForClick;
              } else {
                clickFilter.instansi = [
                  ...clickFilter.instansi,
                  item.label
                ];
              }
            } else {
              if (filter.instansi === item.label) {
                className = 'pencarian__filter-active';
                delete clickFilter.instansi;
              } else {
                clickFilter.instansi = [
                  filter.instansi,
                  item.label
                ];
              }
            }
          } else {
            clickFilter.instansi = item.label;
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

export default Instansi;
