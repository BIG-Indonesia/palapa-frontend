import { useState } from 'react';
import config from '../../../config';

let isFetching = false;
let storedData = null;
export const fetchWeb = () => {
  const [data, setData] = useState(storedData);
  if (!isFetching) {
    isFetching = true;
    fetch(`${config.api}/linkweb/list`)
      .then(res => res.json())
      .then(json => {
        let data = [];
        json.map((item) => {
          data.push({
            label: item.nama,
            image: item.image,
            url: item.url
          });
          return true;
        });
        storedData = data;
        setData(data);
      });
  }
  return data;
};

export default fetchWeb;
