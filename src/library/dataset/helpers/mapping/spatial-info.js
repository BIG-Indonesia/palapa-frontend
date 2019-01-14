import get from 'lodash/get';

export const spatialInfo = (rawMetadata) => {
  const base = 'csw:GetRecordByIdResponse.gmd:MD_Metadata.gmd:spatialRepresentationInfo.gmd:MD_VectorSpatialRepresentation.';
  return {
    title: 'Spatial Representation Info',
    data: [
      {
        title: 'Topologi Level',
        value: get(rawMetadata, `${base}gmd:topologyLevel.gmd:MD_TopologyLevelCode.#text`)
      },
      {
        title: 'Geometric Objects',
        value: get(rawMetadata, `${base}gmd:geometricObjects.gmd:MD_GeometricObjects.gmd:geometricObjectType.gmd:MD_GeometricObjectTypeCode.#text`)
      },
    ],
  };
};

export default spatialInfo;

