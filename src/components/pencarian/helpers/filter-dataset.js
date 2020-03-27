import { latLngBounds } from 'leaflet';

export const filterDataset = ({
  dataset,
  filter,
  mapBounds
}) => {
  if (dataset === null) return null;

  return dataset.filter((item) => {
    if (filter.kategori) {
      if (Array.isArray(filter.kategori)) {
        if (filter.kategori.indexOf(item.kategori) < 0) return false;
      } else {
        if (item.kategori !== filter.kategori) return false;
      }
    }
    if (filter.instansi) {
      if (Array.isArray(filter.instansi)) {
        if (filter.instansi.indexOf(item.author) < 0) return false;
      } else {
        if (item.author !== filter.instansi) return false;
      }
    }
    if (filter.keyword && !item.title.toLowerCase().includes(filter.keyword.toLowerCase())) return false;

    if (filter.bounds) {
      const curMapBounds = latLngBounds(mapBounds);
      const itemBounds = latLngBounds(item.bbox);
      return curMapBounds.intersects(itemBounds);
    }

    return true;
  });
};

export default filterDataset;

