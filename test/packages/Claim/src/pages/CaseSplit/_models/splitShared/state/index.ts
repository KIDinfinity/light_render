import { ESplitTypes } from 'claim/pages/CaseSplit/_models/dto/splitTypes';

export default {
  modalShow: false,
  loadingSplit: false,
  splitType: ESplitTypes.Policy,
  config: {
    region: '',
    case: {
      original: { isDefault: true, isOption: false },
    },
    incident: { incident: {}, treatment: {} },
    policy: { policy: {}, benefit: {} },
  },
};
