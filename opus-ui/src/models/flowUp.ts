import claimFollowUpClaimCaseControllerService from '@/services/claimFollowUpClaimCaseControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import lodash from 'lodash';

export default {
  namespace: 'flowUp',
  state: {
    relateClaimList: [],
    indirectList: [],
  },
  effects: {
    *getFlowUp({ payload }, { call, put }) {
      yield put({
        type: 'saveIndirect',
        payload,
      });
      const response = yield call(claimFollowUpClaimCaseControllerService.get, payload);
      if (response.success && response.resultData) {
        const flowUpData = response.resultData;
        // 保存理赔数据
        yield put({
          type: 'saveFlowUp',
          payload: flowUpData,
        });
      }
      return response;
    },
    *getFlowUpHistory({ payload }, { call, put }) {
      yield put({
        type: 'saveIndirect',
        payload,
      });
      const { inquiryClaimNo } = payload;
      const requestParamOfGet = objectToFormData({
        inquiryClaimNo,
      });
      const response = yield call(
        claimFollowUpClaimCaseControllerService.getByInquiryClaimNo,
        requestParamOfGet
      );
      if (response.success && response.resultData) {
        const flowUpData = response.resultData;
        // 保存理赔数据
        yield put({
          type: 'saveFlowUp',
          payload: flowUpData,
        });
      }
      return response;
    },
  },
  reducers: {
    saveFlowUp(state, action) {
      const relateClaimList = lodash.get(action, 'payload');
      return {
        ...state,
        relateClaimList,
      };
    },
    clearFlowUp(state) {
      return {
        ...state,
        relateClaimList: null,
        indirectList: [],
      };
    },
    saveIndirect(state, action) {
      const followUpInquiryNoClaimList = lodash.get(action, 'payload.followUpInquiryNoClaimList');
      const followUpCalculateClaimNoList = lodash.get(
        action,
        'payload.followUpCalculateClaimNoList'
      );
      const inquiryClaimNo = lodash.get(action, 'payload.inquiryClaimNo');
      let directList = lodash.map(followUpInquiryNoClaimList, (item) => item.relatedInquiryClaimNo);
      directList = lodash.uniq(directList);
      let indirectList = [];
      lodash.each(followUpCalculateClaimNoList, (item) => {
        indirectList.push(item.inquiryClaimNo);
        indirectList.push(item.relatedInquiryClaimNo);
      });
      indirectList = lodash.uniq(indirectList);
      lodash.pull(indirectList, ...directList, inquiryClaimNo);

      return {
        ...state,
        indirectList,
      };
    },
  },
};
