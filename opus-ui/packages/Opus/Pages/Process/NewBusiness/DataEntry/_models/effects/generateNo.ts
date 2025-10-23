import {
  generateNo,
  updateInquiryBusinessNo,
} from '@/services/navigatorCaseOperationControllerService';
import { NAMESPACE } from '../../activity.config';
import bpm from 'bpm/pages/OWBEntrance';
import lodash from 'lodash';

export default function* generateNoEffect({ payload = {} }: any, { put, call, select }) {
  const { salesChannel, globalDispatch } = payload;
  const { businessNo } = yield select((state) => state[NAMESPACE].processData) || {};
  const getTask = yield select(({ processTask }: any) => ({
    getTask: processTask.getTask,
  }));
  const caseNo = getTask?.getTask?.caseNo;

  const result = yield call(generateNo, {
    numberType: 'P',
    conditions: {
      salesChannel,
    },
  });
  if (result.success) {
    //gen完需要触发snapshot&update header policyId
    bpm?.buttonAction('save');
    // if (result?.resultData && globalDispatch && lodash.isFunction(globalDispatch)) {
    //   globalDispatch({
    //     type: 'setPolicyId',
    //     payload: result?.resultData,
    //   });
    // }
    yield put({
      type: 'savePolicyNo',
      payload: result?.resultData as number,
    });
    yield put({
      type: 'saveInquiryBusinessNo',
      payload: result?.resultData as number,
    });
    yield call(updateInquiryBusinessNo, {
      businessNo,
      inquiryBusinessNo: result?.resultData,
      caseNo,
    });
  }
}
