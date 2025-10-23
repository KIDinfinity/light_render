import lodash from 'lodash';
import { startSyncProcessInstance } from '@/services/bpmProcessInstanceService';
import handleMessageModal from '@/utils/commonMessage';
import { tenant } from '@/components/Tenant';
import { findDictionaryByTypeCode as findDictionaryByTypeCodeCache } from '@/utils/dictionary';

export default {
  namespace: 'commonCaseCreate',
  state: {
    caseCategoryOptions: [],
    claimNo: '',
    processInstanceId: '',
    taskId: '',
  },
  effects: {
    *loadCasaeCategory(_: any, { call, put }: any) {
      const language = tenant.getLocaleLang();
      const caseCategoryOptions = yield call(findDictionaryByTypeCodeCache, {
        language,
        typeCode: 'Label_BPM_CaseCategory',
      });
      yield put({
        type: 'setCaseCategory',
        payload: {
          caseCategoryOptions,
        },
      });
    },
    *save({ payload }: any, { call, put }: any) {
      const caseCategory = lodash.get(payload, 'caseCategory', '');
      const variables = lodash.get(payload, 'variables', {});
      const response = yield call(startSyncProcessInstance, {
        caseCategory,
        variables,
      });
      if (response.success) {
        const resultData = lodash.get(response, 'resultData');
        const processInstanceId = lodash.get(resultData, 'processInstanceId', '');
        const taskId = lodash.get(resultData, 'taskId', '');
        const claimNo = lodash.get(resultData, 'claimNo', '');
        yield put({
          type: 'setData',
          payload: {
            processInstanceId,
            claimNo,
            taskId,
          },
        });
      } else {
        const messages = lodash.get(response, 'promptMessages', []);
        handleMessageModal(messages);
      }
    },
  },
  reducers: {
    setData(state: any, action: any) {
      const { processInstanceId, claimNo, taskId } = action.payload;
      return {
        ...state,
        processInstanceId,
        claimNo,
        taskId,
      };
    },
    setCaseCategory(state: any, action: any) {
      const caseCategoryOptions = lodash.get(action, 'payload.caseCategoryOptions', []);
      return {
        ...state,
        caseCategoryOptions,
      };
    },
  },
};
