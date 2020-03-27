import get from 'lodash/get';

export const onlineResources = (rawMetadata) => {
  const base = 'csw:GetRecordByIdResponse.gmd:MD_Metadata.gmd:distributionInfo.gmd:MD_Distribution.gmd:transferOptions.gmd:MD_DigitalTransferOptions.gmd:onLine';
  const resources = get(rawMetadata, base);
  return resources.map((item) => {
    return {
      title: 'Transfer Option: ' + get(item, 'gmd:CI_OnlineResource.gmd:description.gco:CharacterString'),
      data: [
        {
          title: 'Name',
          value: get(item, `gmd:CI_OnlineResource.gmd:name.gco:CharacterString`)
        },
        {
          title: 'Protocol',
          value: get(item, `gmd:CI_OnlineResource.gmd:protocol.gco:CharacterString`)
        },
        {
          title: 'URL',
          value: get(item, `gmd:CI_OnlineResource.gmd:linkage.gmd:URL`)
        },
      ],
    };
  });
};

export default onlineResources;

