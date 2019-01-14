import React  from 'react';
import Header from '../../library/header';
import { Footer } from '../../library/footer';
import { useMedia } from '../../helpers/use-media';
import './index.scss';
import { fetchSettings } from '../../helpers/fetchSettings';
import { fetchBerita } from '../../helpers/fetchBerita';

const Berita = ({ match }) => {
  const dataSettings = fetchSettings();
  const dataBerita = fetchBerita();
  const isSmall = useMedia("(max-width: 760px)");
  const isMedium = useMedia("(min-width: 760px) and (max-width : 1160px)");

  let className = '';
  if (isSmall) {
    className = 'layout-small';
  } else if (isMedium) {
    className = 'layout-medium';
  }
  if (dataBerita === null)  {
    return (
      <div>Loading...</div>
    );
  }
  let detailBerita = {};
  if (dataBerita) {
    dataBerita.map((item) => {
      if (parseInt(item.id) === parseInt(match.params.id)) {
        detailBerita = item;
      }
      return item;
    });
  } else {
    return (
      <div>No Data.</div>
    );
  }
  return (
    <div className={className}>
      <Header
        logo={dataSettings.logo}
        organization={dataSettings.organization}
      />
      <div className="detail-berita">
        <div className="container">
          <h5 className="detail-berita__date">{detailBerita.date}</h5>
          <h2 className="detail-berita__title">{detailBerita.title}</h2>
          <div dangerouslySetInnerHTML={{__html: detailBerita.full}} />
        </div>
      </div>
      <Footer dataSettings={dataSettings} />
    </div>
  );
};

export default Berita;
