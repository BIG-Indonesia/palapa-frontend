import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import Dataset from '../../../../library/dataset';
import './index.scss';

export const DatasetTerbaru = ({ data }) => {
  if (data === null) {
    return (
      <div className="dataset-terbaru">
        <div className="dataset-terbaru__loading">
          <PropagateLoader
            className="dataset-terbaru__loading"
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
    <div className="dataset-terbaru">
      <div className="container dataset-terbaru__wrapper">
        <h2 className="dataset-terbaru__header">
          <span className="dataset-terbaru__header__line" />
          Dataset Terbaru
        </h2>
        <div className="dataset-terbaru__list">
          {data.map((item) => (
            <div key={item.identifier} className="dataset-terbaru__list__item">
              <Dataset {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DatasetTerbaru;
