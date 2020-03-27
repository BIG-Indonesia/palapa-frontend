let finalDataInstansi = null;

export const addCountInstansi = (dataInstansi, dataDataset) => {
  if (finalDataInstansi) return finalDataInstansi;
  if (dataDataset === null || dataInstansi === null) return null;
  if (dataDataset === [] || dataInstansi === []) return dataInstansi;

  let counts = {};
  dataDataset.map((dataset) => {
    const curInstansi = dataset.author;
    if (curInstansi in counts) {
      counts[curInstansi]++;
    } else {
      counts[curInstansi] = 1;
    }
    return dataset;
  });
  finalDataInstansi = dataInstansi.map((instansi) => {
    return {
      ...instansi,
      count: counts[instansi.label]
    };
  });
  return finalDataInstansi;
};

export default addCountInstansi;
