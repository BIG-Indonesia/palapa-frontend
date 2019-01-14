import { contact } from './mapping/contact.js';
import { summary } from './mapping/summary.js';
import { spatialInfo } from './mapping/spatial-info.js';
import { reference } from './mapping/reference.js';
import { identification } from './mapping/identification.js';
import { distributor } from './mapping/distributor.js';
import { onlineResources } from './mapping/online-resources.js';

export const mappingMetadata = (rawMetadata) => {
  return [
    summary(rawMetadata),
    identification(rawMetadata),
    spatialInfo(rawMetadata),
    reference(rawMetadata),
    ...onlineResources(rawMetadata),
    contact(rawMetadata),
    distributor(rawMetadata),
  ];
};

export default mappingMetadata;
