import { useState } from 'react';
import config from '../config';

let isFetching = false;
let storedData = null;
export const fetchBerita = () => {
  const [data, setData] = useState(storedData);
  if (!isFetching) {
    isFetching = true;
    fetch(`${config.api}/berita/list`)
      .then(res => res.json())
      .then(json => {
        let data = [];
        const recentData = json.slice(0, 3);
        recentData.map((item) => {
          data.push({
            id: item.id,
            title: item.judul,
            date: item.tanggal,
            content: item.stripped || '',
            full: item.isiberita || '',
          });
          return true;
        });
        storedData = data;
        setData(data);
      });
  }
  return data;
};

export default fetchBerita;
