import React from 'react';
import './index.scss';

export const MetadataPanel = ({
  title,
  data = []
}) => {
  return (
    <div className="metadata-panel">
      <h2 className="metadata-panel__title">{title}</h2>
      <div className="metadata-panel__content">
      {data.map(item => (
        <div className="metadata-panel__item" key={item.title}>
          <div className="metadata-panel__item-title">{item.title}</div>
          <div className="metadata-panel__item-value">{item.value}</div>
        </div>
      ))}
      </div>
    </div>
  )
};

