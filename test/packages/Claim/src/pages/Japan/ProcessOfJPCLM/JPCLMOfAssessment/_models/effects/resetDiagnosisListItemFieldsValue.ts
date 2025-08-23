import { filterNeedResetValueFields } from '@/utils/medicalSearch';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* resetDiagnosisListItemFieldsValue({ payload }, { put }) {
  const { messageList, formData, incidentId, diagnosisId } = lodash.pick(payload, [
    'messageList',
    'formData',
    'diagnosisId',
    'incidentId',
  ]);
  const fields = filterNeedResetValueFields({
    messageList,
  });
  const changedFields = formUtils.cleanFieldsValue({
    formData,
    fields,
  });
  yield put({
    type: 'saveDiagnosisItem',
    payload: {
      changedFields,
      incidentId,
      diagnosisId,
    },
  });
}
