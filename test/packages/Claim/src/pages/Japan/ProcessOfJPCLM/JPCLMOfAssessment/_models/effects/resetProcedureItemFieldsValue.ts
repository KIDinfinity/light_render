import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { filterNeedResetValueFields } from '@/utils/medicalSearch';

export default function* resetProcedureItemFieldsValue({ payload }, { put }) {
  const { messageList, formData, treatmentId, procedureId } = lodash.pick(payload, [
    'messageList',
    'formData',
    'treatmentId',
    'procedureId',
  ]);
  const fields = filterNeedResetValueFields({
    messageList,
  });
  const changedFields = formUtils.cleanFieldsValue({
    formData,
    fields,
  });
  yield put({
    type: 'saveProcedureItem',
    payload: {
      changedFields,
      treatmentId,
      procedureId,
    },
  });
}
