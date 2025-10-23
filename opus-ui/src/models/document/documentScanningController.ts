import {
  state,
  effects,
  reducers,
} from '../../../packages/DocumentManage/src/DocumentScanning/_models';

export default {
  namespace: 'documentScanningController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
