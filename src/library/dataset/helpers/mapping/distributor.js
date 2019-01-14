import get from 'lodash/get';

export const distributor = (rawMetadata) => {
  const base = 'csw:GetRecordByIdResponse.gmd:MD_Metadata.gmd:distributionInfo.gmd:MD_Distribution.gmd:distributor.gmd:MD_Distributor.gmd:distributorContact.gmd:CI_ResponsibleParty.';
  return {
    title: 'Distributor',
    data: [
      {
        title: 'Individual Name',
        value: get(rawMetadata, `${base}gmd:individualName.gco:CharacterString`)
      },
      {
        title: 'Organisation Name',
        value: get(rawMetadata, `${base}gmd:organisationName.gco:CharacterString`)
      },
      {
        title: 'Position Name',
        value: get(rawMetadata, `${base}gmd:positionName.gco:CharacterString`)
      },
      {
        title: 'Phone',
        value: get(rawMetadata, `${base}gmd:contactInfo.gmd:CI_Contact.gmd:phone.gmd:CI_Telephone.gmd:voice.gco:CharacterString`)
      },
      {
        title: 'Fax',
        value: get(rawMetadata, `${base}gmd:contactInfo.gmd:CI_Contact.gmd:phone.gmd:CI_Telephone.gmd:facsimile.gco:CharacterString`)
      },
      {
        title: 'Delivery Point',
        value: get(rawMetadata, `${base}gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:deliveryPoint.gco:CharacterString`)
      },
      {
        title: 'City',
        value: get(rawMetadata, `${base}gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:city.gco:CharacterString`)
      },
      {
        title: 'Administrative Area',
        value: get(rawMetadata, `${base}gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:administrativeArea.gco:CharacterString`)
      },
      {
        title: 'Postal Code',
        value: get(rawMetadata, `${base}gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:postalCode.gco:CharacterString`)
      },
      {
        title: 'Country',
        value: get(rawMetadata, `${base}gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:country.gco:CharacterString`)
      },
      {
        title: 'Email',
        value: get(rawMetadata, `${base}gmd:contactInfo.gmd:CI_Contact.gmd:address.gmd:CI_Address.gmd:electronicMailAddress.gco:CharacterString`)
      },
      {
        title: 'Online Resources',
        value: get(rawMetadata, `${base}gmd:contactInfo.gmd:CI_Contact.gmd:onlineResource.gmd:CI_OnlineResource.gmd:linkage.gmd:URL`)
      },
      {
        title: 'Hours of Services',
        value: get(rawMetadata, `${base}gmd:contactInfo.gmd:CI_Contact.gmd:hoursOfService.gco:CharacterString`)
      },
      {
        title: 'Contact Instructions',
        value: get(rawMetadata, `${base}gmd:contactInfo.gmd:CI_Contact.gmd:contactInstructions.gco:CharacterString`)
      },
    ],
  };
};

export default distributor;

