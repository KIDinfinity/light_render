import SpecialEndorsement, {
  localFieldConfig as SpecialEndorsementConfig,
} from './SpecialEndorsement';
import RelatedToAlcohol, { localFieldConfig as RelatedToAlcoholConfig } from './RelatedToAlcohol';
import RelatedToAssaultHit, {
  localFieldConfig as RelatedToAssaultHitConfig,
} from './RelatedToAssaultHit';
import TrafficAccident, { localFieldConfig as TrafficAccidentConfig } from './TrafficAccident';
import CongenitalIllness, {
  localFieldConfig as CongenitalIllnessConfig,
} from './CongenitalIllness';
import SecondaryCoverage, {
  localFieldConfig as SecondaryCoverageConfig,
} from './SecondaryCoverage';

export const localFieldConfigs = [
  SpecialEndorsementConfig,
  RelatedToAlcoholConfig,
  RelatedToAssaultHitConfig,
  TrafficAccidentConfig,
  CongenitalIllnessConfig,
  SecondaryCoverageConfig,
];

export default {
  SpecialEndorsement,
  RelatedToAlcohol,
  RelatedToAssaultHit,
  TrafficAccident,
  CongenitalIllness,
  SecondaryCoverage,
};
