import get from 'lodash/get';

export const reference = (rawMetadata) => {
  const base = 'csw:GetRecordByIdResponse.gmd:MD_Metadata.gmd:referenceSystemInfo.gmd:MD_ReferenceSystem.gmd:referenceSystemIdentifier.gmd:RS_Identifier.';
  return {
    title: 'Reference System Info Identifier',
    data: [
      {
        title: 'Code',
        value: get(rawMetadata, `${base}gmd:code.gco:CharacterString`)
      },
      {
        title: 'Version',
        value: get(rawMetadata, `${base}gmd:version.gco:CharacterString`)
      },
      {
        title: 'Authority',
        value: get(rawMetadata, `${base}gmd:authority.gmd:CI_Citation.gmd:title.gco:CharacterString`)
      },
      {
        title: 'Authority Resource',
        value: get(rawMetadata, `${base}gmd:authority.gmd:CI_Citation.gmd:citedResponsibleParty.gmd:CI_ResponsibleParty.gmd:contactInfo.gmd:CI_Contact.gmd:onlineResource.gmd:CI_OnlineResource.gmd:linkage.gmd:URL`)
      },
    ],
  };
};

export default reference;

