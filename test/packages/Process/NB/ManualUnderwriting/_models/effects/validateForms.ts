import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import handleMessageModal from '@/utils/commonMessage';

export default function* validateFields(_: any, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });

  const forms = yield select(({ formCommonController }: any) => formCommonController.forms);
  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
  });
  if (errors?.length) {
    const messageSet = new Set();
    lodash.forEach(errors, (fieldItem: any) => {
      lodash.forEach(fieldItem, (item: any) => {
        messageSet.add({
          content: `${item.field} ${item.message}`,
        });
      });
    });
    handleMessageModal(Array.from(messageSet));
  };

  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return errors;
}
