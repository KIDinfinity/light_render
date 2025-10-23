import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { filterNeedResetValueFields } from '@/utils/medicalSearch';

export default function* resetOtherProdureFieldsValue({ payload }, { put }) {
  const { messageList, formData, treatmentId, otherProcedureId } = lodash.pick(payload, [
    'messageList',
    'formData',
    'treatmentId',
    'otherProcedureId',
  ]);
  const fields = filterNeedResetValueFields({
    messageList,
  });
  const changedFields = formUtils.cleanFieldsValue({
    formData,
    fields,
  });
  yield put({
    type: 'saveOtherProcedureItem',
    payload: {
      changedFields,
      otherProcedureId,
      treatmentId,
    },
  });
}
