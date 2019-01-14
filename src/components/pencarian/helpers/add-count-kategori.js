let finalDataKategori = null;

export const addCountKategori = (dataKategori, dataDataset) => {
  if (finalDataKategori) return finalDataKategori;
  if (dataDataset === null || dataKategori === null) return null;
  if (dataDataset === [] || dataKategori === []) return dataKategori;

  let counts = {};
  dataDataset.map((dataset) => {
    const curKategori = dataset.kategori;
    if (curKategori in counts) {
      counts[curKategori]++;
    } else {
      counts[curKategori] = 1;
    }
    return dataset;
  });
  finalDataKategori = dataKategori.map((kategori) => {
    return {
      ...kategori,
      count: counts[kategori.label]
    };
  });
  return finalDataKategori;
};

export default addCountKategori;
