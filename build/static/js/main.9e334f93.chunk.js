(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{139:function(e,a,t){e.exports=t(308)},150:function(e,a,t){},170:function(e,a,t){},226:function(e,a,t){},228:function(e,a,t){},273:function(e,a,t){},275:function(e,a,t){},277:function(e,a,t){},279:function(e,a,t){},281:function(e,a,t){},283:function(e,a,t){},285:function(e,a,t){},298:function(e,a,t){},300:function(e,a,t){},302:function(e,a,t){},304:function(e,a,t){},306:function(e,a,t){},308:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),i=t(20),c=t.n(i),l=t(314),o=t(309),s=t(14),m=t(3),d=t(312),u=t(311),g=t(315),p=t(17),_=t.n(p),f=t(105),v=t(130),h=t(310),E=(t(150),function(e){var a=e.organization,t=void 0===a?"":a,i=e.logo,c=void 0===i?"":i,l=Object(n.useState)(!1),o=Object(m.a)(l,2),s=o[0],d=o[1],u="header";return s&&(u="header header-active"),r.a.createElement("div",{className:u},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"header__logo"},r.a.createElement(v.a,{to:"/"},r.a.createElement("img",{src:c,alt:""})),r.a.createElement("h1",null,r.a.createElement(v.a,{to:"/"},"Geoportal ".concat(t))),r.a.createElement("div",{className:"header__nav-handle",onClick:function(){return d(!s)}},r.a.createElement("span",{className:"icon-list"}))),r.a.createElement("div",{className:"header__nav"},r.a.createElement(h.a,{exact:!0,activeClassName:"active",to:"/"},"Home"),r.a.createElement("a",{href:"/jelajah/"},"Jelajah"),r.a.createElement(h.a,{activeClassName:"active",to:"/pencarian/"},"Pencarian"),r.a.createElement("a",{href:"/gspalapa/"},"Login"))))}),C=t(28),N=t.n(C),b=(t(170),t(59),t(60),{dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,autoplaySpeed:2e3,autoplay:!0}),y=function(e){var a=e.images,t=void 0===a?[]:a;return r.a.createElement("div",{className:"carousel"},r.a.createElement(N.a,b,t.map(function(e,a){return r.a.createElement("div",{key:"carousel-".concat(a)},r.a.createElement("div",{className:"carousel__image",style:{backgroundImage:'url("'+e+'")'}}))})))},I=t(15),k=t.n(I),w=t(82),S=t.n(w),x=t(313),O="http://REPGSMANAGERDOM",j={host:"".concat(O,"/"),api:"".concat(O,"/api"),wms:"".concat(O,"/geoserver/wms?")},M=(t(226),t(228),function(e){var a=e.title,t=e.data,n=void 0===t?[]:t;return r.a.createElement("div",{className:"metadata-panel"},r.a.createElement("h2",{className:"metadata-panel__title"},a),r.a.createElement("div",{className:"metadata-panel__content"},n.map(function(e){return r.a.createElement("div",{className:"metadata-panel__item",key:e.title},r.a.createElement("div",{className:"metadata-panel__item-title"},e.title),r.a.createElement("div",{className:"metadata-panel__item-value"},e.value))})))}),D=t(50),R=t(1),z=t.n(R),B=function(e){var a="csw:GetRecordByIdResponse.gmd:MD_Metadata.gmd:contact.gmd:CI_ResponsibleParty.";return{title:"Contact",data:[{title:"Individual Name",value:z()(e,"".concat(a,"gmd:individualName.gco:CharacterString"))},{title:"Organisation Name",value:z()(e,"".concat(a,"gmd:organisationName.gco:CharacterString"))},{title:"Position Name",value:z()(e,"".concat(a,"gmd:positionName.gco:CharacterString"))},{title:"Phone",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:phone.gmd:CI_Telephone.gmd:voice.gco:CharacterString"))},{title:"Fax",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:phone.gmd:CI_Telephone.gmd:facsimile.gco:CharacterString"))},{title:"Delivery Point",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:deliveryPoint.gco:CharacterString"))},{title:"City",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:city.gco:CharacterString"))},{title:"Administrative Area",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:administrativeArea.gco:CharacterString"))},{title:"Postal Code",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:postalCode.gco:CharacterString"))},{title:"Country",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:country.gco:CharacterString"))},{title:"Email",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:electronicMailAddress.gco:CharacterString"))},{title:"Online Resources",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:onlineResource.gmd:CI_OnlineResource.gmd:linkage.gmd:URL"))},{title:"Hours of Services",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:hoursOfService.gco:CharacterString"))},{title:"Contact Instructions",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:contactInstructions.gco:CharacterString"))}]}},L=function(e){var a="csw:GetRecordByIdResponse.gmd:MD_Metadata.";return{title:"Metadata",data:[{title:"File Identifier",value:z()(e,"".concat(a,"gmd:fileIdentifier.gco:CharacterString"))},{title:"Language",value:z()(e,"".concat(a,"gmd:language.gmd:LanguageCode.#text"))},{title:"Character Set",value:z()(e,"".concat(a,"gmd:characterSet.gmd:MD_CharacterSetCode.#text"))},{title:"Hierarchy Level",value:z()(e,"".concat(a,"gmd:hierarchyLevel.gmd:MD_ScopeCode.#text"))},{title:"Date",value:z()(e,"".concat(a,"gmd:dateStamp.gco:DateTime"))},{title:"Metadata Standard Name",value:z()(e,"".concat(a,"gmd:metadataStandardName.gco:CharacterString"))},{title:"Metadata Standard Version",value:z()(e,"".concat(a,"gmd:metadataStandardVersion.gco:CharacterString"))},{title:"Dataset URI",value:z()(e,"".concat(a,"gmd:dataSetURI.gco:CharacterString"))},{title:"Maintenance Frequency",value:z()(e,"".concat(a,"gmd:metadataMaintenance.gmd:MD_MaintenanceInformation.gmd:maintenanceAndUpdateFrequency.gmd:MD_MaintenanceFrequencyCode.#text"))},{title:"Maintenance Note",value:z()(e,"".concat(a,"gmd:metadataMaintenance.gmd:MD_MaintenanceInformation.gmd:maintenanceNote.gco:CharacterString"))},{title:"Constraints",value:z()(e,"".concat(a,"gmd:metadataConstraints.gmd:MD_SecurityConstraints.gmd:userNote.gco:CharacterString"))}]}},A=function(e){var a="csw:GetRecordByIdResponse.gmd:MD_Metadata.gmd:spatialRepresentationInfo.gmd:MD_VectorSpatialRepresentation.";return{title:"Spatial Representation Info",data:[{title:"Topologi Level",value:z()(e,"".concat(a,"gmd:topologyLevel.gmd:MD_TopologyLevelCode.#text"))},{title:"Geometric Objects",value:z()(e,"".concat(a,"gmd:geometricObjects.gmd:MD_GeometricObjects.gmd:geometricObjectType.gmd:MD_GeometricObjectTypeCode.#text"))}]}},T=function(e){var a="csw:GetRecordByIdResponse.gmd:MD_Metadata.gmd:referenceSystemInfo.gmd:MD_ReferenceSystem.gmd:referenceSystemIdentifier.gmd:RS_Identifier.";return{title:"Reference System Info Identifier",data:[{title:"Code",value:z()(e,"".concat(a,"gmd:code.gco:CharacterString"))},{title:"Version",value:z()(e,"".concat(a,"gmd:version.gco:CharacterString"))},{title:"Authority",value:z()(e,"".concat(a,"gmd:authority.gmd:CI_Citation.gmd:title.gco:CharacterString"))},{title:"Authority Resource",value:z()(e,"".concat(a,"gmd:authority.gmd:CI_Citation.gmd:citedResponsibleParty.gmd:CI_ResponsibleParty.gmd:contactInfo.gmd:CI_Contact.gmd:onlineResource.gmd:CI_OnlineResource.gmd:linkage.gmd:URL"))}]}},P=function(e){var a="csw:GetRecordByIdResponse.gmd:MD_Metadata.gmd:identificationInfo.gmd:MD_DataIdentification.";return{title:"Data Identification",data:[{title:"Title",value:z()(e,"".concat(a,"gmd:citation.gmd:CI_Citation.gmd:title.gco:CharacterString"))},{title:"Date",value:z()(e,"".concat(a,"gmd:citation.gmd:CI_Citation.gmd:date.gmd:CI_Date.gmd:date.gco:DateTime"))},{title:"Abstract",value:z()(e,"".concat(a,"gmd:abstract.gco:CharacterString"))},{title:"Maintenance Frequency",value:z()(e,"".concat(a,"gmd:resourceMaintenance.gmd:MD_MaintenanceInformation.gmd:maintenanceAndUpdateFrequency.gmd:MD_MaintenanceFrequencyCode.#text"))},{title:"Keywords",value:z()(e,"".concat(a,"gmd:descriptiveKeywords.gmd:MD_Keywords.gmd:keyword.gco:CharacterString"))},{title:"Resource Constraints",value:z()(e,"".concat(a,"gmd:resourceConstraints.gmd:MD_LegalConstraints.gmd:accessConstraints.gmd:MD_RestrictionCode.#text"))},{title:"Spatial Representation Type",value:z()(e,"".concat(a,"gmd:spatialRepresentationType.gmd:MD_SpatialRepresentationTypeCode.#text"))},{title:"Language",value:z()(e,"".concat(a,"gmd:language.gmd:LanguageCode.#text"))},{title:"Character Set",value:z()(e,"".concat(a,"gmd:characterSet.gmd:MD_CharacterSetCode.#text"))},{title:"Topic Category",value:z()(e,"".concat(a,"gmd:topicCategory.gmd:MD_TopicCategoryCode"))},{title:"West Bound Longitude",value:z()(e,"".concat(a,"gmd:extent.gmd:EX_Extent.gmd:geographicElement.gmd:EX_GeographicBoundingBox.gmd:westBoundLongitude.gco:Decimal"))},{title:"East Bound Longitude",value:z()(e,"".concat(a,"gmd:extent.gmd:EX_Extent.gmd:geographicElement.gmd:EX_GeographicBoundingBox.gmd:eastBoundLongitude.gco:Decimal"))},{title:"South Bound Latitude",value:z()(e,"".concat(a,"gmd:extent.gmd:EX_Extent.gmd:geographicElement.gmd:EX_GeographicBoundingBox.gmd:southBoundLatitude.gco:Decimal"))},{title:"North Bound Latitude",value:z()(e,"".concat(a,"gmd:extent.gmd:EX_Extent.gmd:geographicElement.gmd:EX_GeographicBoundingBox.gmd:northBoundLatitude.gco:Decimal"))}]}},G=function(e){var a="csw:GetRecordByIdResponse.gmd:MD_Metadata.gmd:distributionInfo.gmd:MD_Distribution.gmd:distributor.gmd:MD_Distributor.gmd:distributorContact.gmd:CI_ResponsibleParty.";return{title:"Distributor",data:[{title:"Individual Name",value:z()(e,"".concat(a,"gmd:individualName.gco:CharacterString"))},{title:"Organisation Name",value:z()(e,"".concat(a,"gmd:organisationName.gco:CharacterString"))},{title:"Position Name",value:z()(e,"".concat(a,"gmd:positionName.gco:CharacterString"))},{title:"Phone",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:phone.gmd:CI_Telephone.gmd:voice.gco:CharacterString"))},{title:"Fax",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:phone.gmd:CI_Telephone.gmd:facsimile.gco:CharacterString"))},{title:"Delivery Point",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:deliveryPoint.gco:CharacterString"))},{title:"City",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:city.gco:CharacterString"))},{title:"Administrative Area",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:administrativeArea.gco:CharacterString"))},{title:"Postal Code",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:postalCode.gco:CharacterString"))},{title:"Country",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:country.gco:CharacterString"))},{title:"Email",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:electronicMailAddress.gco:CharacterString"))},{title:"Online Resources",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:onlineResource.gmd:CI_OnlineResource.gmd:linkage.gmd:URL"))},{title:"Hours of Services",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:hoursOfService.gco:CharacterString"))},{title:"Contact Instructions",value:z()(e,"".concat(a,"gmd:contactInfo.gmd:CI_Contact.gmd:contactInstructions.gco:CharacterString"))}]}},F=function(e){return z()(e,"csw:GetRecordByIdResponse.gmd:MD_Metadata.gmd:distributionInfo.gmd:MD_Distribution.gmd:transferOptions.gmd:MD_DigitalTransferOptions.gmd:onLine").map(function(e){return{title:"Transfer Option: "+z()(e,"gmd:CI_OnlineResource.gmd:description.gco:CharacterString"),data:[{title:"Name",value:z()(e,"gmd:CI_OnlineResource.gmd:name.gco:CharacterString")},{title:"Protocol",value:z()(e,"gmd:CI_OnlineResource.gmd:protocol.gco:CharacterString")},{title:"URL",value:z()(e,"gmd:CI_OnlineResource.gmd:linkage.gmd:URL")}]}})},U=function(e){return[L(e),P(e),A(e),T(e)].concat(Object(D.a)(F(e)),[B(e),G(e)])};S.a.setAppElement("#root");var K,q,H=function(e){var a=e.title,t=e.kategori,i=e.author,c=e.image,l=e.identifier,o=e.downloadable,s=e.bbox,p=Object(n.useState)(!1),_=Object(m.a)(p,2),f=_[0],h=_[1],E=Object(n.useState)(!1),C=Object(m.a)(E,2),N=C[0],b=C[1],y=Object(n.useState)([]),I=Object(m.a)(y,2),k=I[0],w=I[1],O=Object(n.useState)(null),D=Object(m.a)(O,2),R=D[0],z=D[1],B=function(){fetch("".concat(j.host,"/csw?service=CSW&version=2.0.2&request=GetRecordById&ElementSetName=full&Id=").concat(l,"&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/json")).then(function(e){return e.json()}).then(function(e){var a=U(e);w(a),h(!0)})},L=function(){z(s),b(!0)},A=null;"Y"===o&&(A=r.a.createElement("a",{href:"".concat(j.api,"/download_shape?layer=").concat(l),className:"dataset__actions-download"},r.a.createElement("span",{className:"icon-cloud-download"})));var T={};return T=R?{bounds:R,zoomControl:!1}:{center:[-6.175985,106.827313],zoom:12,zoomControl:!1},r.a.createElement("div",{id:"dataset-".concat(l)},r.a.createElement(S.a,{isOpen:N,onRequestClose:function(){return b(!1)}},r.a.createElement("div",{className:"dataset__map"},r.a.createElement("div",{className:"dataset__map__header"},r.a.createElement("h3",{className:"dataset__map__title"},a),r.a.createElement("span",{className:"dataset__map__close",onClick:function(){return b(!1)}},r.a.createElement("span",{className:"icon-close"}))),r.a.createElement(d.a,T,r.a.createElement(u.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),r.a.createElement(x.a,{layers:l,url:j.wms,transparent:!0,format:"image/png"}),r.a.createElement(g.a,{position:"topleft"})))),r.a.createElement(S.a,{isOpen:f,onRequestClose:function(){return h(!1)}},r.a.createElement("div",{className:"dataset__metadata__header"},r.a.createElement("h3",{className:"dataset__metadata__title"},a),r.a.createElement("span",{className:"dataset__metadata__close",onClick:function(){return h(!1)}},r.a.createElement("span",{className:"icon-close"}))),r.a.createElement("div",{className:"dataset__metadata__content"},k.map(function(e,a){return r.a.createElement(M,Object.assign({key:a},e))}))),r.a.createElement("div",{className:"dataset"},r.a.createElement("div",{className:"dataset__actions"},r.a.createElement("a",{href:"#map",className:"dataset__actions-map",onClick:function(e){e.preventDefault(),L()}},r.a.createElement("span",{className:"icon-map"})),r.a.createElement("a",{href:"#info",className:"dataset__actions-info",onClick:function(e){e.preventDefault(),B()}},r.a.createElement("span",{className:"icon-info"})),A),r.a.createElement("div",{className:"dataset__image-wrapper",onClick:function(e){e.preventDefault(),L()}},r.a.createElement("span",{className:"dataset__image-aligner"}),r.a.createElement("img",{className:"dataset__image",src:c,alt:""})),r.a.createElement(v.a,{className:"dataset__kategori",to:"/pencarian?kategori=".concat(t)},t),r.a.createElement("div",{className:"dataset__title-wrapper"},r.a.createElement("a",{href:"#info",className:"dataset__title",onClick:function(e){e.preventDefault(),B()}},a)),r.a.createElement(v.a,{className:"dataset__author",to:"/pencarian?instansi=".concat(i)},i)))},X=H,W=(t(273),function(e){var a=e.data;return null===a?r.a.createElement("div",{className:"dataset-terbaru"},r.a.createElement("div",{className:"dataset-terbaru__loading"},r.a.createElement(k.a,{className:"dataset-terbaru__loading",sizeUnit:"px",size:10,color:"#e87171",loading:!0}))):a.length<1?null:r.a.createElement("div",{className:"dataset-terbaru"},r.a.createElement("div",{className:"container dataset-terbaru__wrapper"},r.a.createElement("h2",{className:"dataset-terbaru__header"},r.a.createElement("span",{className:"dataset-terbaru__header__line"}),"Dataset Terbaru"),r.a.createElement("div",{className:"dataset-terbaru__list"},a.map(function(e){return r.a.createElement("div",{key:e.identifier,className:"dataset-terbaru__list__item"},r.a.createElement(X,e))}))))}),V=(t(275),function(e){var a=e.data,t=e.history;return null===a?r.a.createElement("div",{className:"kategori "},r.a.createElement("div",{className:"kategori__loading"},r.a.createElement(k.a,{sizeUnit:"px",size:10,color:"#fff",loading:!0}))):a.length<1?null:r.a.createElement("div",{className:"kategori"},r.a.createElement("div",{className:"container kategori__wrapper"},r.a.createElement("h2",{className:"kategori__header"},r.a.createElement("span",{className:"kategori__header__line"}),"Kategori"),r.a.createElement("div",{className:"kategori__item-list"},a.map(function(e){return r.a.createElement("div",{key:e.label,className:"kategori__item-wrapper"},r.a.createElement("a",{className:"kategori__item",href:"#kategori",onClick:function(a){a.preventDefault(),t.push(e.link),window.scrollTo(0,0)}},r.a.createElement("span",{className:"kategori__item__logo"},r.a.createElement("img",{className:"kategori__item__image",src:e.image,alt:""})),r.a.createElement("span",{className:"kategori__item__label"},e.label)))}))))}),J=(t(277),function(e){var a=e.title,t=e.data,n=e.isSmall,i=e.isMedium,c=e.history;if(null===t)return r.a.createElement("div",{className:"instansi"},r.a.createElement("div",{className:"instansi__loading"},r.a.createElement(k.a,{sizeUnit:"px",size:10,color:"#e87171",loading:!0})));if(t.length<1)return null;var l=6;n&&(l=3),i&&(l=5);var o={dots:!0,infinite:t.length>l,speed:500,slidesToShow:l,slidesToScroll:l,rows:1,autoplaySpeed:2e3,autoplay:!0,arrows:!1};return r.a.createElement("div",{className:"instansi"},r.a.createElement("div",{className:"container instansi__wrapper"},r.a.createElement("h2",{className:"instansi__header"},r.a.createElement("span",{className:"instansi__header__line"}),"Instansi"),r.a.createElement(N.a,o,t.map(function(e,t){return r.a.createElement("div",{key:"carousel-".concat(a,"-").concat(t),className:"instansi__item-wrapper"},r.a.createElement("a",{className:"instansi__item",href:"#instansi",onClick:function(a){a.preventDefault(),c.push(e.url),window.scroll(0,0)}},r.a.createElement("span",{className:"instansi__item__logo"},r.a.createElement("span",{className:"instansi__item__image-aligner"}),r.a.createElement("img",{className:"instansi__item__image",src:e.image,alt:""})),r.a.createElement("span",{className:"instansi__item__label"},e.label)))}))))}),Y=(t(279),function(e){var a=e.title,t=e.data,n=e.isSmall,i=e.isMedium;if(null===t)return r.a.createElement("div",{className:"link-carousel"},r.a.createElement("div",{className:"link-carousel__loading"},r.a.createElement(k.a,{sizeUnit:"px",size:10,color:"#e87171",loading:!0})));if(t.length<1)return null;var c=5;n&&(c=2),i&&(c=5);var l={dots:!0,infinite:t.length>c,speed:500,slidesToShow:c,slidesToScroll:c,rows:1,autoplaySpeed:2e3,autoplay:!0,arrows:!1};return r.a.createElement("div",{className:"link-carousel"},r.a.createElement("div",{className:"container link-carousel__wrapper"},r.a.createElement("h2",{className:"link-carousel__header"},r.a.createElement("span",{className:"link-carousel__header__line"}),a),r.a.createElement(N.a,l,t.map(function(e,t){return r.a.createElement("div",{key:"carousel-".concat(a,"-").concat(t),className:"link-carousel__item-wrapper"},r.a.createElement("a",{className:"link-carousel__item",href:e.url,title:e.label},r.a.createElement("span",{className:"link-carousel__item__logo"},r.a.createElement("span",{className:"link-carousel__item__image-aligner"}),r.a.createElement("img",{className:"link-carousel__item__image",src:e.image,alt:""}))))}))))}),$=(t(281),function(e){var a=e.data,t=e.clickHandler;return null===a?r.a.createElement("div",{className:"berita"},r.a.createElement("div",{className:"berita__loading"},r.a.createElement(k.a,{sizeUnit:"px",size:10,color:"#e87171",loading:!0}))):a.length<1?null:r.a.createElement("div",{className:"berita"},r.a.createElement("div",{className:"container"},r.a.createElement("h2",{className:"berita__header"},r.a.createElement("span",{className:"berita__header__line"}),"Berita Geoportal"),r.a.createElement("div",{className:"berita__items"},r.a.createElement("div",{className:"berita__items__wrapper"},a.map(function(e,a){return r.a.createElement("div",{key:"berita-".concat(a),className:"berita__item"},r.a.createElement("h4",{className:"berita__item__tanggal"},e.date),r.a.createElement("h3",{className:"berita__item__title",onClick:function(){return t(e.id),window.scrollTo(0,0),!1}},e.title),r.a.createElement("p",null,e.content))})))))}),Q=(t(283),function(e){var a=e.dataSettings,t=void 0===a?{}:a,n=null,i=null,c=null;return t.email&&(n=r.a.createElement("p",null,"Email: ",t.email)),t.phone&&(i=r.a.createElement("p",null,"Telp: ",t.phone)),t.fax&&(c=r.a.createElement("p",null,"Cax: ",t.fax)),r.a.createElement("div",{className:"footer"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"footer__didukung"},r.a.createElement("h3",{className:"footer__header"},"Didukung Oleh"),r.a.createElement("div",{className:"footer__logo"},r.a.createElement("a",{className:"footer__logo__item",href:"/"},r.a.createElement("img",{src:"/assets/images/logo-big.png",alt:"BIG"})),r.a.createElement("a",{className:"footer__logo__item",href:"/"},r.a.createElement("img",{src:t.logo,alt:""})))),r.a.createElement("div",{className:"footer__kontak"},r.a.createElement("h3",{className:"footer__header"},"Kontak Kami"),r.a.createElement("p",null,t.organization,r.a.createElement("br",null),t.address),n,i,c),r.a.createElement("div",{className:"footer__tentang"},r.a.createElement("h3",{className:"footer__header"},"Tentang Kami"),r.a.createElement("p",null,t.tentangkami),r.a.createElement("p",null,"Palapa V.3.4"),r.a.createElement("p",null,"\xa9 2019 Badan Informasi Geospasial All rights reserved."))))}),Z=(t(285),t(287),function(e){var a=Object(n.useState)(window.matchMedia(e).matches),t=Object(m.a)(a,2),r=t[0],i=t[1];return Object(n.useEffect)(function(){var a=window.matchMedia(e);a.matches!==r&&i(a.matches);var t=function(){return i(a.matches)};return a.addListener(t),function(){return a.removeListener(t)}},[e]),r}),ee=!1,ae={},te=function(){var e=Object(n.useState)(ae),a=Object(m.a)(e,2),t=a[0],r=a[1];return ee||(ee=!0,fetch("".concat(j.api,"/sisteminfo")).then(function(e){return e.json()}).then(function(e){ae={organization:e.organization,logo:e.logo,tentangkami:e.tentangkami,address:[e.address,e.city,e.postalcode,e.administrativearea,e.country].join(", "),email:e.email,phone:e.phone,fax:e.fax};var a="Geoportal ".concat(e.organization);document.title=a,r(ae)})),t},ne=!1,re=null,ie=function(){var e=Object(n.useState)(re),a=Object(m.a)(e,2),t=a[0],r=a[1];return ne||(ne=!0,fetch("".concat(j.api,"/berita/list")).then(function(e){return e.json()}).then(function(e){var a=[];e.slice(0,3).map(function(e){return a.push({id:e.id,title:e.judul,date:e.tanggal,content:e.stripped||"",full:e.isiberita||""}),!0}),re=a,r(a)})),t},ce=!1,le=null,oe=/\(([^)]+)\)/,se=function(){var e=Object(n.useState)(le),a=Object(m.a)(e,2),t=a[0],r=a[1];return ce||(ce=!0,fetch("".concat(j.api,"/listmetalayer")).then(function(e){return e.json()}).then(function(e){var a=[];e.map(function(e){var t=oe.exec(e.bbox)[1].split(","),n=t[0].split(" "),r=t[1].split(" ");return a.push({identifier:e.identifier,title:e.title,downloadable:e.downloadable,kategori:e.keywords,image:"".concat(j.host,"/gsassets/thumbnails/")+e.identifier.replace(/:/,"-")+".png",author:e.workspace,bbox:[[parseFloat(n[1]),parseFloat(n[0])],[parseFloat(r[1]),parseFloat(r[0])]]}),!0}),le=a,r(a)})),t},me=!1,de=null,ue=function(){var e=Object(n.useState)(de),a=Object(m.a)(e,2),t=a[0],r=a[1];return me||(me=!0,fetch("".concat(j.api,"/jumlahdataset")).then(function(e){return e.json()}).then(function(e){var a=[];e.map(function(e){return a.push({link:"/pencarian?kategori=".concat(e.keywords),label:e.keywords,value:e.keywords,image:e.logo}),!0}),de=a,r(a)})),t},ge=!1,pe=null,_e=function(){var e=Object(n.useState)(pe),a=Object(m.a)(e,2),t=a[0],r=a[1];return ge||(ge=!0,fetch("".concat(j.api,"/group/listl")).then(function(e){return e.json()}).then(function(e){var a=[];e.map(function(e){return a.push({label:e.name,value:e.name,image:e.logo,url:"/pencarian?instansi=".concat(e.name)}),!0}),pe=a,r(a)})),t},fe=!1,ve={},he=function(){var e=Object(n.useState)(ve),a=Object(m.a)(e,2),t=a[0],r=a[1];return fe||(fe=!0,fetch("".concat(j.api,"/frontend")).then(function(e){return e.json()}).then(function(e){var a=[];e[0].image_1&&a.push(e[0].image_1),e[0].image_2&&a.push(e[0].image_2),e[0].image_3&&a.push(e[0].image_3),e[0].image_4&&a.push(e[0].image_4),ve={tagline:e[0].remark_1,images:a},r(ve)})),t},Ee=!1,Ce=null,Ne=function(){var e=Object(n.useState)(Ce),a=Object(m.a)(e,2),t=a[0],r=a[1];return Ee||(Ee=!0,fetch("".concat(j.api,"/linkweb/list")).then(function(e){return e.json()}).then(function(e){var a=[];e.map(function(e){return a.push({label:e.nama,image:e.image,url:e.url}),!0}),Ce=a,r(a)})),t},be=function(e){return null===e?null:K||(e.map(function(e){return a?(e.bbox[0][0]<a[0][0]&&(a[0][0]=e.bbox[0][0]),e.bbox[0][1]<a[0][1]&&(a[0][1]=e.bbox[0][1]),e.bbox[1][0]>a[1][0]&&(a[1][0]=e.bbox[1][0]),e.bbox[1][1]>a[1][1]&&(a[1][1]=e.bbox[1][1])):a=e.bbox,e}),K=a,a);var a},ye={},Ie=function(e){var a=e.history,t=Object(n.useState)(""),i=Object(m.a)(t,2),c=i[0],l=i[1],o=te(),p=he(),v=se(),h=null===v?null:v.slice(0,4),C=ue(),N=_e(),b=Ne(),I=ie(),k=Object(n.useState)(!1),w=Object(m.a)(k,2),S=w[0],x=w[1],O=be(v),j=null;O&&S&&null==j&&(j=r.a.createElement(d.a,{bounds:O,zoomControl:!1,onMoveend:function(e){return function(e){var a=e.e,t=(e.history,a.target.getBounds()),n=t.getSouth(),r=t.getWest(),i=t.getEast(),c=t.getNorth();ye.bounds=[[n,r],[c,i]]}({e:e,history:a})}},r.a.createElement(u.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),r.a.createElement(g.a,{position:"topleft"})));var M=Z("(max-width: 760px)"),D=Z("(min-width: 760px) and (max-width : 1160px)"),R="search";S&&(R="search search-active");var z={control:function(e){return Object(s.a)({},e,{borderRadius:0,height:M?40:60,backgroundColor:"#f1f1f1"})}},B=650,L="";M?(B=200,L="layout-small"):D&&(L="layout-medium",B=400);var A=function(e){if(e.preventDefault(),S){var t=_.a.stringify(ye);a.push("/pencarian?".concat(t)),window.scroll(0,0)}else c&&(a.push("/pencarian?keyword=".concat(c)),window.scroll(0,0))};return r.a.createElement("div",{className:L},r.a.createElement(E,{logo:o.logo,organization:o.organization}),r.a.createElement("div",{className:"home"},r.a.createElement("div",{className:"banner"},r.a.createElement(y,{images:p.images}),r.a.createElement("div",{className:"banner__overlay"})),r.a.createElement("div",{className:"home__search"},r.a.createElement("div",{className:"container"},r.a.createElement("p",{className:"home__search__intro"},p.tagline),r.a.createElement("div",{id:"cari",className:R},r.a.createElement("a",{href:"#cari",className:"search__advanced-link",onClick:function(){window.dispatchEvent(new Event("resize")),x(!S)}},r.a.createElement("span",{className:"icon-settings"})),r.a.createElement("span",{className:"search__submit-wrapper"},r.a.createElement("a",{href:"#submit-search",className:"search__submit",onClick:function(e){return A(e)}},r.a.createElement("span",{className:"icon-magnifier"}))),r.a.createElement("div",{className:"search__select-wrapper"},r.a.createElement("div",{className:"search__select-kategori"},r.a.createElement(f.a,{placeholder:"Semua Kategori",options:C||[],styles:z,onChange:function(e){ye.kategori=e.value}})),r.a.createElement("div",{className:"search__select-walidata"},r.a.createElement(f.a,{placeholder:"Semua Instansi",options:N||[],styles:z,onChange:function(e){ye.instansi=e.value}}))),r.a.createElement("span",{className:"search__input-wrapper"},r.a.createElement("input",{type:"text",placeholder:"Kata Kunci",className:"search__input",value:c,onChange:function(e){ye.keyword=e.target.value,l(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&A(e)}})),r.a.createElement("div",{className:"search__map-wrapper",style:{height:S?B:0}},r.a.createElement("div",{className:"search__map"},j)))))),r.a.createElement(W,{data:h}),r.a.createElement(V,{data:C,history:a}),r.a.createElement(J,{history:a,data:N,isSmall:M,isMedium:D}),r.a.createElement(Y,{title:"Web GIS",data:b,isSmall:M,isMedium:D}),r.a.createElement($,{data:I,clickHandler:function(e){return a.push("/berita/".concat(e))}}),r.a.createElement(Q,{dataSettings:o}))},ke=(t(298),function(){var e=Object(n.useState)(window.innerHeight),a=Object(m.a)(e,2),t=a[0],i=a[1];Object(n.useEffect)(function(){var e=function(){return i(window.innerHeight)};return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}});var c=te(),l=Z("(max-width: 760px)"),o=Z("(min-width: 760px) and (max-width : 1160px)"),s="";return l?s="layout-small":o&&(s="layout-medium"),r.a.createElement("div",{className:s},r.a.createElement(E,{logo:c.logo,organization:c.organization}),r.a.createElement("div",{className:"jelajah",style:{height:t}},r.a.createElement(d.a,{center:[-6.175985,106.827313],zoom:12,zoomControl:!1},r.a.createElement(u.a,{attribution:'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),r.a.createElement(g.a,{position:"topright"}))))}),we=(t(300),{dots:!1,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,autoplaySpeed:2e3,autoplay:!0}),Se=function(e){var a=e.images,t=void 0===a?[]:a;return r.a.createElement("div",{className:"pencarian_carousel"},r.a.createElement(N.a,we,t.map(function(e,a){return r.a.createElement("div",{key:"carousel-".concat(a)},r.a.createElement("div",{className:"pencarian_carousel__image",style:{backgroundImage:'url("'+e+'")'}}))})))},xe=function(e){var a=e.data,t=e.filter,n=e.history;return null===a?r.a.createElement("div",null,r.a.createElement("h4",null,"Kategori"),r.a.createElement("div",{className:"pencarian__loading"},r.a.createElement(k.a,{sizeUnit:"px",size:10,color:"#e87171",loading:!0}))):r.a.createElement("div",null,r.a.createElement("h4",null,"Kategori"),r.a.createElement("ul",null,a.map(function(e){var a,i=Object(s.a)({},t);if(t.kategori)if(a="pencarian__filter-inactive",Array.isArray(t.kategori)){var c=[];t.kategori.map(function(t){return t===e.label?a="pencarian__filter-active":c.push(t),t}),i.kategori="pencarian__filter-active"===a?c:Object(D.a)(i.kategori).concat([e.label])}else t.kategori===e.label?(a="pencarian__filter-active",delete i.kategori):i.kategori=[t.kategori,e.label];else i.kategori=e.label;var l=_.a.stringify(i);return r.a.createElement("li",{key:e.label,className:a,onClick:function(){n.push("/pencarian?"+l)}},r.a.createElement("span",{className:"pencarian__filter-item"},e.label),r.a.createElement("span",{className:"pencarian__filter-count"},e.count))})))},Oe=function(e){var a=e.data,t=e.filter,n=e.history;return null===a?r.a.createElement("div",null,r.a.createElement("h4",null,"Instansi"),r.a.createElement("div",{className:"pencarian__loading"},r.a.createElement(k.a,{sizeUnit:"px",size:10,color:"#e87171",loading:!0}))):r.a.createElement("div",null,r.a.createElement("h4",null,"Instansi"),r.a.createElement("ul",null,a.map(function(e){var a,i=Object(s.a)({},t);if(t.instansi)if(a="pencarian__filter-inactive",Array.isArray(t.instansi)){var c=[];t.instansi.map(function(t){return t===e.label?a="pencarian__filter-active":c.push(t),t}),i.instansi="pencarian__filter-active"===a?c:Object(D.a)(i.instansi).concat([e.label])}else t.instansi===e.label?(a="pencarian__filter-active",delete i.instansi):i.instansi=[t.instansi,e.label];else i.instansi=e.label;var l=_.a.stringify(i);return r.a.createElement("li",{key:e.label,className:a,onClick:function(){n.push("/pencarian?"+l)}},r.a.createElement("span",{className:"pencarian__filter-item"},e.label),r.a.createElement("span",{className:"pencarian__filter-count"},e.count))})))},je=function(e){var a=e.data;return null===a?r.a.createElement("div",null,r.a.createElement("div",{className:"pencarian__loading"},r.a.createElement(k.a,{sizeUnit:"px",size:10,color:"#e87171",loading:!0}))):a.length<1?r.a.createElement("div",{className:"pencarian__nodata"},"Data tidak ditemukan."):r.a.createElement("div",null,a.map(function(e){return r.a.createElement("div",{key:e.identifier,className:"pencarian__dataset__list__item"},r.a.createElement(H,e))}))},Me=null,De=function(e,a){if(Me)return Me;if(null===a||null===e)return null;if(a===[]||e===[])return e;var t={};return a.map(function(e){var a=e.author;return a in t?t[a]++:t[a]=1,e}),Me=e.map(function(e){return Object(s.a)({},e,{count:t[e.label]})})},Re=null,ze=function(e,a){if(Re)return Re;if(null===a||null===e)return null;if(a===[]||e===[])return e;var t={};return a.map(function(e){var a=e.kategori;return a in t?t[a]++:t[a]=1,e}),Re=e.map(function(e){return Object(s.a)({},e,{count:t[e.label]})})},Be=function(e){var a=e.datasetLength,t=e.currentPage,n=e.filter,i=e.history;if(a-1<12)return null;var c=null,l=null;if(12*(t-1)+12<a){var o=Object(s.a)({},n,{page:parseInt(t)+1});c=r.a.createElement("span",{className:"pagination__next",onClick:function(){i.push("/pencarian?"+_.a.stringify(o)),window.scroll(0,0)}},"Selanjutnya ",r.a.createElement("span",{className:"icon-arrow-right"}))}if(t>1){var m=Object(s.a)({},n,{page:parseInt(t)-1});l=r.a.createElement("span",{className:"pagination__prev",onClick:function(){i.push("/pencarian?"+_.a.stringify(m)),window.scroll(0,0)}},r.a.createElement("span",{className:"icon-arrow-left"})," Sebelumnya")}return r.a.createElement("div",{className:"pagination"},c,l)},Le=t(8),Ae=function(e){var a=e.dataset,t=e.filter,n=e.mapBounds;return null===a?null:a.filter(function(e){if(t.kategori)if(Array.isArray(t.kategori)){if(t.kategori.indexOf(e.kategori)<0)return!1}else if(e.kategori!==t.kategori)return!1;if(t.instansi)if(Array.isArray(t.instansi)){if(t.instansi.indexOf(e.author)<0)return!1}else if(e.author!==t.instansi)return!1;if(t.keyword&&!e.title.toLowerCase().includes(t.keyword.toLowerCase()))return!1;if(t.bounds){var a=Object(Le.latLngBounds)(n),r=Object(Le.latLngBounds)(e.bbox);return a.intersects(r)}return!0})},Te=(t(302),function(e){var a=e.location,t=e.history,i=(q=_.a.parse(a.search)).page||1;delete q.page;var c,l=Object(n.useState)(q.keyword),o=Object(m.a)(l,2),p=o[0],f=o[1],v=te(),h=he(),C=_e(),N=ue(),b=se(),y=ze(N,b),I=De(C,b),k=be(b),w=null;if(k){if(q.bounds){var S=q.bounds[0].split(","),x=q.bounds[1].split(",");k=[[parseFloat(S[0]),parseFloat(S[1])],[parseFloat(x[0]),parseFloat(x[1])]]}c={bounds:k,zoomControl:!1},w=r.a.createElement(d.a,Object.assign({},c,{onMoveend:function(e){return function(e){var a=e.e,t=e.history,n=a.target.getBounds(),r=n.getSouth(),i=n.getWest(),c=n.getEast(),l=n.getNorth(),o=Object(s.a)({},q,{bounds:[[r,i],[l,c]]});t.push("/pencarian?".concat(_.a.stringify(o)))}({e:e,history:t})}}),r.a.createElement(u.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),r.a.createElement(g.a,{position:"topleft"}))}var O=Ae({dataset:b,filter:q,mapBounds:k}),j=O?O.length:0,M=function(e){var a=e.dataset,t=e.page;if(null===a)return null;if(a.length<12)return a;var n=12*(t-1);return a.splice(n,12)}({dataset:O,page:i}),D=Z("(max-width: 760px)"),R=Z("(min-width: 760px) and (max-width : 1160px)"),z="";return D?z="layout-small":R&&(z="layout-medium"),r.a.createElement("div",{className:z},r.a.createElement(E,{logo:v.logo,organization:v.organization}),r.a.createElement("div",{className:"pencarian"},r.a.createElement("div",{className:"pencarian__banner"},r.a.createElement(Se,{images:h.images}),r.a.createElement("div",{className:"pencarian__banner__overlay"},r.a.createElement("div",{className:"container"},r.a.createElement("h2",null,"Pencarian Data")))),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"pencarian__filter"},r.a.createElement("h3",null,"Filter Pencarian"),r.a.createElement("div",{className:"pencarian__panel"},r.a.createElement("h4",null,"Batas Pencarian"),r.a.createElement("div",{className:"pencarian__peta"},w),r.a.createElement(xe,{data:y,filter:q,history:t}),r.a.createElement(Oe,{data:I,filter:q,history:t}))),r.a.createElement("div",{className:"pencarian__content"},r.a.createElement("div",{className:"pencarian__input-wrapper"},r.a.createElement("a",{href:"#submit-search",className:"pencarian__submit",onClick:function(e){e.preventDefault();var a=Object(s.a)({},q,{keyword:p}),n=_.a.stringify(a);t.push("/pencarian?".concat(n))}},r.a.createElement("span",{className:"icon-magnifier"})),r.a.createElement("span",{className:"pencarian__clear",style:{display:p&&p.length>0?"block":"none"},onClick:function(){f(""),document.getElementById("pencarian__input").focus()}},r.a.createElement("span",{className:"icon-close"})),r.a.createElement("input",{id:"pencarian__input",type:"text",placeholder:"Kata Kunci",className:"pencarian__input",value:p,onChange:function(e){return f(e.target.value)},onKeyPress:function(e){if("Enter"===e.key){var a=Object(s.a)({},q,{keyword:p}),n=_.a.stringify(a);t.push("/pencarian?".concat(n))}}})),r.a.createElement("div",{className:"pencarian__dataset__list"},r.a.createElement(je,{data:M})),r.a.createElement(Be,{datasetLength:j,currentPage:i,filter:q,history:t}))),r.a.createElement(Q,{dataSettings:v})))}),Pe=(t(304),function(e){var a=e.match,t=te(),n=ie(),i=Z("(max-width: 760px)"),c=Z("(min-width: 760px) and (max-width : 1160px)"),l="";if(i?l="layout-small":c&&(l="layout-medium"),null===n)return r.a.createElement("div",null,"Loading...");var o={};return n?(n.map(function(e){return parseInt(e.id)===parseInt(a.params.id)&&(o=e),e}),r.a.createElement("div",{className:l},r.a.createElement(E,{logo:t.logo,organization:t.organization}),r.a.createElement("div",{className:"detail-berita"},r.a.createElement("div",{className:"container"},r.a.createElement("h5",{className:"detail-berita__date"},o.date),r.a.createElement("h2",{className:"detail-berita__title"},o.title),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:o.full}}))),r.a.createElement(Q,{dataSettings:t}))):r.a.createElement("div",null,"No Data.")});t(306),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(function(){return r.a.createElement(l.a,null,r.a.createElement("div",null,r.a.createElement(o.a,{path:"/",exact:!0,component:Ie}),r.a.createElement(o.a,{path:"/jelajah/",component:ke}),r.a.createElement(o.a,{path:"/pencarian/",component:Te}),r.a.createElement(o.a,{path:"/berita/:id",component:Pe})))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[139,2,1]]]);
//# sourceMappingURL=main.9e334f93.chunk.js.map