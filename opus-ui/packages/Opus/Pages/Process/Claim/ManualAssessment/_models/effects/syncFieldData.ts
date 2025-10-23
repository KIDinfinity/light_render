import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import lodash from 'lodash';
import bpm from 'bpm/pages/OWBEntrance';
import { claimInfoSync } from '@/services/claimOmneService';
import NAMESPACE from '../nameSpace';

export default function* (action: any, { call, put, select }: any) {
  if (!action?.payload) return;

  const { agencyDisclosureFlag } = action.payload;

  const taskDetail = yield select((state: any) => state.processTask.getTask);

  const dataForSubmit = yield put.resolve({
    type: `${NAMESPACE}/getDataForSubmit`,
  });

  if (!dataForSubmit?.claimant) return;

  lodash.set(dataForSubmit, 'claimant.agencyDisclosureFlag', agencyDisclosureFlag);

  const submitData = getSubmitData({ taskDetail, dataForSubmit });

  const res = yield call(claimInfoSync, submitData);

  if (!Boolean(res?.success)) {
    handleErrorMessageIgnoreXErrorNotice(res);
    return;
  }

  if (res?.resultData) {
    bpm.buttonAction('save');
  }
}
