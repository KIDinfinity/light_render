import { notification } from 'antd';
import lodash from 'lodash';
import owbNbProposalControllerService from '@/services/owbNbProposalControllerService';
import bpm from 'bpm/pages/OWBEntrance';
import CheckNtuType from 'process/NB/Enum/CheckNtuType';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../activity.config';

export default function* updateNtuJob({ payload }: any, { put, call, select }: any) {
  const { currentNtuDate } = payload;
  const { applicationNo, policyId } = yield select(({ [NAMESPACE]: modelnamepsace }: any) => ({
    applicationNo: modelnamepsace.businessData?.applicationNo,
    policyId: modelnamepsace.businessData?.policyId,
  }));
  const response = yield call(owbNbProposalControllerService.updateNtuJob, {
    id: policyId,
    applicationNo,
    ntuDate: currentNtuDate,
    manualExtendNtu: true,
  });
  if (lodash.isPlainObject(response) && response?.success) {
    yield put({
      type: 'saveShowNtuModal',
      payload: {
        isShowNtuModal: false,
      },
    });
    yield put({
      type: 'setNtuData',
      payload: {
        changedFields: {
          extendtoDate: null,
          extendtoDays: null,
          currentNtuDate,
          currentRadio: CheckNtuType.ExtendtoDate,
        },
      },
    });
    // fake form change for auit log
    yield put({
      type: 'saveFormData',
      target: 'updateNtuDate',
      payload: {
        changedFields: {
          ntuDate: {
            value: currentNtuDate,
            name: 'currentNtuDate',
            label: formatMessageApi({
              Label_BIZ_Policy: 'NTUDate',
            }),
            format: 'L',
            dirty: true,
            validating: false,
          },
        },
      },
    });
    bpm.buttonAction('save');
  } else {
    const errorMessage = response?.promptMessages?.[0]?.content;
    if (errorMessage) {
      notification.error({ message: errorMessage });
    }
  }
}
