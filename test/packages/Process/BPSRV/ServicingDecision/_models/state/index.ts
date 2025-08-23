import {v4 as uuidv4 } from 'uuid';

export default {
  default: {
    addressChangeInfo: {
      id: uuidv4(),
      countryCode: 'THA',
    },
  },

  country: [],
  province: [],
  district: [],
  city: [],
  sortApplyListMap: {},

  transactionTypeCodeMap: [],

  processData: {},
  entities: {},
  servicingInit: false,
  runPaymentModeRule: true,
};
