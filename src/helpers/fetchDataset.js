import { useState } from 'react';
import config from '../config';

let isFetching = false;
let storedData = null;
const regExp = /\(([^)]+)\)/;

export const fetchDataset = () => {
  const [data, setData] = useState(storedData);
  if (!isFetching) {
    isFetching = true;
    fetch(`${config.api}/listmetalayer`)
      .then(res => res.json())
      .then(json => {
        let data = [];
        json.map((item) => {
          const attemp1 = regExp.exec(item.bbox);
          const attemp2 = attemp1[1].split(',');
          const x1 = attemp2[0].split(' ');
          const x2 = attemp2[1].split(' ');

          data.push({
            identifier: item.identifier,
            title: item.title,
            downloadable: item.downloadable,
            kategori: item.keywords,
            image: `${config.host}/gsassets/thumbnails/` + item.identifier.replace(/:/,'-') + '.png',
            author: item.workspace,
            bbox: [
              [
                parseFloat(x1[1]),
                parseFloat(x1[0]),
              ],
              [
                parseFloat(x2[1]),
                parseFloat(x2[0])
              ]
            ],
          });
          return true;
        });
        storedData = data;
        setData(data);
      });
  }
  return data;
};

export default fetchDataset;
