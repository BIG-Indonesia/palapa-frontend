import get from 'lodash/get';

export const summary = (rawMetadata) => {
  const base = 'csw:GetRecordByIdResponse.gmd:MD_Metadata.';
  return {
    title: 'Metadata',
    data: [
      {
        title: 'File Identifier',
        value: get(rawMetadata, `${base}gmd:fileIdentifier.gco:CharacterString`)
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
        title: 'Hierarchy Level',
        value: get(rawMetadata, `${base}gmd:hierarchyLevel.gmd:MD_ScopeCode.#text`)
      },
      {
        title: 'Date',
        value: get(rawMetadata, `${base}gmd:dateStamp.gco:DateTime`)
      },
      {
        title: 'Metadata Standard Name',
        value: get(rawMetadata, `${base}gmd:metadataStandardName.gco:CharacterString`)
      },
      {
        title: 'Metadata Standard Version',
        value: get(rawMetadata, `${base}gmd:metadataStandardVersion.gco:CharacterString`)
      },
      {
        title: 'Dataset URI',
        value: get(rawMetadata, `${base}gmd:dataSetURI.gco:CharacterString`)
      },
      {
        title: 'Maintenance Frequency',
        value: get(rawMetadata, `${base}gmd:metadataMaintenance.gmd:MD_MaintenanceInformation.gmd:maintenanceAndUpdateFrequency.gmd:MD_MaintenanceFrequencyCode.#text`)
      },
      {
        title: 'Maintenance Note',
        value: get(rawMetadata, `${base}gmd:metadataMaintenance.gmd:MD_MaintenanceInformation.gmd:maintenanceNote.gco:CharacterString`)
      },
      {
        title: 'Constraints',
        value: get(rawMetadata, `${base}gmd:metadataConstraints.gmd:MD_SecurityConstraints.gmd:userNote.gco:CharacterString`)
      },
    ]
  };
};

export default summary;

