/*
 * @Author: Simon
 * @Date: 2024-04-23 15:26:26
 * @LastEditors: LastAuthor
 * @LastEditTime: 2024-04-23 19:05:40
 * @Description: 根据配置以及effectiveDare 设置isBack
 */
import { getDefaultValueByCode } from '@/services/owbNbCfgControllerService';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import moment from 'moment';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { effectiveDate } = payload;
  const response = yield call(getDefaultValueByCode, {
    codeType: 'backdateRefDate',
  });
  const effectiveDateRes = yield call(getDefaultValueByCode, {
    codeType: 'updateEffectiveDate',
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  let isBack;
  if (resultData === 'proposalDate') {
    const proposalDate = yield select(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.modalData?.processData?.planInfoData?.proposalDate
    ) || [];
    const changedDate = moment(effectiveDate).valueOf();
    const proposalDateDate = moment(formUtils.queryValue(proposalDate)).format('DD/MM/YYYY');
    const proposalDateTime = moment(proposalDateDate, 'DD/MM/YYYY').valueOf();
    isBack = changedDate < proposalDateTime ? 'Y' : 'N';
  } else {
    const changedDate = moment(effectiveDate).format('L');
    const date = new Date();
    const currentDate = moment(date).format('L');
    isBack = changedDate !== currentDate ? 'Y' : 'N';
  }
  const { resultData: effectiveResult } = lodash.pick(effectiveDateRes, ['success', 'resultData']);
  if (effectiveResult === 'N') {
    yield put({
      type: 'savePlanInfoData',
      payload: {
        changedFields: {
          isBack,
        },
        type: 'change',
      },
    });
  }
}
