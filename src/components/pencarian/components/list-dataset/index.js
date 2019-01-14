import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { Dataset } from '../../../../library/dataset'

export const ListDataset = ({ data }) => {
  if (data === null) return (
    <div>
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
  if (data.length < 1) {
    return (
      <div className="pencarian__nodata">Data tidak ditemukan.</div>
    )
  }
  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.identifier} className="pencarian__dataset__list__item">
            <Dataset {...item} />
          </div>
        )
      })}
    </div>
  );
};

export default ListDataset;
