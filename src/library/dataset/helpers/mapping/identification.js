import get from 'lodash/get';

export const identification = (rawMetadata) => {
  const base = 'csw:GetRecordByIdResponse.gmd:MD_Metadata.gmd:identificationInfo.gmd:MD_DataIdentification.';
  return {
    title: 'Data Identification',
    data: [
      {
        title: 'Title',
        value: get(rawMetadata, `${base}gmd:citation.gmd:CI_Citation.gmd:title.gco:CharacterString`)
      },
      {
        title: 'Date',
        value: get(rawMetadata, `${base}gmd:citation.gmd:CI_Citation.gmd:date.gmd:CI_Date.gmd:date.gco:DateTime`)
      },
      {
        title: 'Abstract',
        value: get(rawMetadata, `${base}gmd:abstract.gco:CharacterString`)
      },
      {
        title: 'Maintenance Frequency',
        value: get(rawMetadata, `${base}gmd:resourceMaintenance.gmd:MD_MaintenanceInformation.gmd:maintenanceAndUpdateFrequency.gmd:MD_MaintenanceFrequencyCode.#text`)
      },
      {
        title: 'Keywords',
        value: get(rawMetadata, `${base}gmd:descriptiveKeywords.gmd:MD_Keywords.gmd:keyword.gco:CharacterString`)
      },
      {
        title: 'Resource Constraints',
        value: get(rawMetadata, `${base}gmd:resourceConstraints.gmd:MD_LegalConstraints.gmd:accessConstraints.gmd:MD_RestrictionCode.#text`)
      },
      {
        title: 'Spatial Representation Type',
        value: get(rawMetadata, `${base}gmd:spatialRepresentationType.gmd:MD_SpatialRepresentationTypeCode.#text`)
      },
      {
        title: 'Language',
        value: get(rawMetadata, `${base}gmd:language.gmd:LanguageCode.#text`)
      },
      {
        title: 'Character Set',
        value: get(rawMetadata, `${base}gmd:characterSet.gmd:MD_CharacterSetCode.#text`)
      },
      {
        title: 'Topic Category',
        value: get(rawMetadata, `${base}gmd:topicCategory.gmd:MD_TopicCategoryCode`)
      },
      {
        title: 'West Bound Longitude',
        value: get(rawMetadata, `${base}gmd:extent.gmd:EX_Extent.gmd:geographicElement.gmd:EX_GeographicBoundingBox.gmd:westBoundLongitude.gco:Decimal`)
      },
      {
        title: 'East Bound Longitude',
        value: get(rawMetadata, `${base}gmd:extent.gmd:EX_Extent.gmd:geographicElement.gmd:EX_GeographicBoundingBox.gmd:eastBoundLongitude.gco:Decimal`)
      },
      {
        title: 'South Bound Latitude',
        value: get(rawMetadata, `${base}gmd:extent.gmd:EX_Extent.gmd:geographicElement.gmd:EX_GeographicBoundingBox.gmd:southBoundLatitude.gco:Decimal`)
      },
      {
        title: 'North Bound Latitude',
        value: get(rawMetadata, `${base}gmd:extent.gmd:EX_Extent.gmd:geographicElement.gmd:EX_GeographicBoundingBox.gmd:northBoundLatitude.gco:Decimal`)
      },
    ],
  };
};

export default identification;

