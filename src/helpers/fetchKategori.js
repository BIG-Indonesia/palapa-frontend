import { useState } from 'react';
import config from '../config';

let isFetching = false;
let storedData = null;
export const fetchKategori = () => {
  const [data, setData] = useState(storedData);
  if (!isFetching) {
    isFetching = true;
    fetch(`${config.api}/jumlahdataset`)
      .then(res => res.json())
      .then(json => {
        let data = [];
        json.map((item) => {
          data.push({
            link: `/pencarian?kategori=${item.keywords}`,
            label: item.keywords,
            value: item.keywords,
            image: item.logo
          });
          return true;
        });
        storedData = data;
        setData(data);
      });
  }
  return data;
};

export default fetchKategori;
