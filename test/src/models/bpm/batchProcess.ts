import bpmBatchProcessService from '@/services/bpmBatchProcessService';

export default {
  namespace: 'batchProcess',

  state: {},

  effects: {
    *bundleToBatchProcess({ payload }, { call }) {
      // type: 'A' // 天然
      // type: 'M' // 手工
      const response = yield call(bpmBatchProcessService.bundleToBatchProcess, payload);
      return response;
    },
    *deleteBatchProcessListByNo({ payload }, { call }) {
      // type: 'A' // 天然
      // type: 'M' // 手工
      const response = yield call(bpmBatchProcessService.deleteBatchProcessListByNo, payload);

      return response;
    },
  },

  reducers: {},
};
