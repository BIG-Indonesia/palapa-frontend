let filterMaxExtent;

export const findMaxExtent = (dataset) => {
  if (dataset === null) return null;
  if (filterMaxExtent) return filterMaxExtent;
  let extent;
  dataset.map((item) => {
    if (!extent) {
      extent = item.bbox;
    } else {
      if (item.bbox[0][0] < extent[0][0]) {
        extent[0][0] = item.bbox[0][0];
      }
      if (item.bbox[0][1] < extent[0][1]) {
        extent[0][1] = item.bbox[0][1];
      }
      if (item.bbox[1][0] > extent[1][0]) {
        extent[1][0] = item.bbox[1][0];
      }
      if (item.bbox[1][1] > extent[1][1]) {
        extent[1][1] = item.bbox[1][1];
      }
    }
    return item;
  });
  filterMaxExtent = extent;
  return extent;
};

export default findMaxExtent;
