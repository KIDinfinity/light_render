import lodash from 'lodash';

import { saveKlipCaseInfo } from '@/services/claimJpLifejBoControllerService';
import { formUtils } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';

import { NAMESPACE } from '../../activity.config';

export default function* setKlipCaseInfo({ payload }: any, { select, put, call }: any) {
  const { incidentId } = payload || {};

  const klipCaseInfoList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.integration?.[incidentId]?.klipCaseInfoList
  ) || [];
  const claimNo = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimProcessData?.claimNo
  ) || [];


  if (!lodash.isEmpty(klipCaseInfoList)) {
    const response = yield call(
      saveKlipCaseInfo,
      lodash
        .chain(formUtils.cleanValidateData(klipCaseInfoList) || [])
        .map((item: any) => ({
          ...item,
          claimNo: !item?.claimNo ? claimNo : item?.claimNo,
        }))
        .value()
    );

    if (lodash.isPlainObject(response) && response.success) {
      yield put({
        type: 'saveIntegration',
        payload: { incidentId },
      });
      bpm.buttonAction('save');
      return [];
    } else {
      return response?.promptMessages || ['api fail'];
    }
  } else {
    yield put({
      type: 'saveIntegration',
      payload: { incidentId },
    });
  }
  return [];
}
