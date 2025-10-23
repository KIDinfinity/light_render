import {
  state,
  effects,
  reducers,
} from '../../../packages/DocumentManage/src/BatchDocumentScanning/_models';

export default {
  namespace: 'batchDocumentScanningController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
