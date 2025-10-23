import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getInformationGroups } from '@/services/bpmInfoControllerService';

import bpmProcessTaskService from '@/services/bpmProcessTaskService';

import type { IEffects } from '../interfaces/index';

/**
 * 加载节点名称
 * @param caseNo
 * @param userId
 */
export default function* ({ payload: { caseDetail } }: any, { call, put, all, select }: IEffects) {
  const userId = yield select((state: any) => state.user.currentUser.userId);
  const curGroupCode = yield select((state: any) => state.infoController.curGroupCode);

  const {
    caseCategory,
    taskDefKey: activityCode,
    taskId,
    businessCode,
    caseNo,
    inquiryBusinessNo,
  } = lodash.pick(caseDetail, [
    'caseCategory',
    'taskDefKey',
    'taskId',
    'businessCode',
    'caseNo',
    'inquiryBusinessNo',
  ]);

  yield put({
    type: 'saveCaseInfo',
    payload: { info: caseDetail },
  });
  // const {
  //   taskId,
  //   caseCategory,
  //   taskDefKey: activityCode,
  //   businessCode,
  // } = lodash.pick(payload?.taskDetail, ['taskId', 'caseCategory', 'taskDefKey', 'businessCode']);

  const classification = yield put.resolve({
    type: 'getClassificationData',
    payload: {
      processInstanceId: caseNo,
    },
  });

  const [activityRes, infoGroupsRes] = yield all([
    call(
      bpmProcessTaskService.loadActivityCategory,
      objectToFormData({
        userId,
        caseNo,
        taskId,
      })
    ),
    call(getInformationGroups, {
      taskId,
      caseNo,
      caseCategory,
      activityCode,
    }),
  ]);

  const resultData = lodash.get(activityRes, 'resultData', {});
  const activityCategory = lodash.isEmpty(resultData)
    ? {}
    : {
        ...resultData,
        activityName: formatMessageApi({
          activity: resultData?.activityCode,
        }),
      };

  yield put({
    type: 'setActivityCategory',
    payload: {
      activityCategory,
    },
  });

  yield put({
    type: 'setInfoGroups',
    payload: {
      ...lodash.get(infoGroupsRes, 'resultData', {}),
      caseCategory,
      activityCode,
    },
  });

  yield put({
    type: 'getInfoHistory',
    payload: {
      caseNo,
      activityCode,
      classification,
      inquiryBusinessNo,
    },
  });

  yield put.resolve({
    type: 'getIsShowUploadButton',
    payload: {
      caseNo,
      businessCode,
    },
  });

  yield put({
    type: 'setLoading',
    payload: false,
  });

  if (!curGroupCode) {
    yield put({
      type: 'setCurGroupCategory',
    });
  }
}
