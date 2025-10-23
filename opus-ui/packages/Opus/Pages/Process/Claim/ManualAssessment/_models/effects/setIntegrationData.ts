import lodash from 'lodash';

import { saveKlipCaseInfo } from '@/services/claimJpLifejBoControllerService';

import { formUtils } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';

import { NAMESPACE } from '../../activity.config';

export default function* setKlipCaseInfo(_: any, { select, put, call }: any) {
  const klipCaseInfoList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.popupData?.klipCaseInfoList
  ) || [];

  if (!lodash.isEmpty(klipCaseInfoList)) {
    const response = yield call(saveKlipCaseInfo, formUtils.cleanValidateData(klipCaseInfoList));

    if (lodash.isPlainObject(response) && response.success) {
      yield put({
        type: 'popupDataConfirm',
      });
      bpm.buttonAction('save');
      return true;
    }
  } else {
    yield put({
      type: 'popupDataConfirm',
    });
  }
  return false;
}
