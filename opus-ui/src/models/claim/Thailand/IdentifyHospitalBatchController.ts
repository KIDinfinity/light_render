import initState from 'claim/pages/Thailand/ProcessOfIHB/IdentifyHospitalBatch/_models/state';
import effects from 'claim/pages/Thailand/ProcessOfIHB/IdentifyHospitalBatch/_models/effects';
import reducers from 'claim/pages/Thailand/ProcessOfIHB/IdentifyHospitalBatch/_models/reducers';

export default {
  namespace: 'IdentifyHospitalBatchController',
  state: {
    ...initState,
  },

  effects: {
    ...effects,
  },

  reducers: {
    ...reducers,
  },
};
