import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { messageModal } from '@/utils/commonMessage';
import { requestHandleType } from 'bpm/enum/requestHandleType';

export default function* validateFields(_: any, { select, put }: any) {
  const attachList = yield select((state: any) => state.UnknownDocumentBaseController.attachList) ||
    [];

  yield put({
    type: 'formCommonController/handleValidating',
  });
  const forms = yield select((state: any) => state.formCommonController.forms);
  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });

  if (
    !lodash.isEmpty(attachList) &&
    lodash.some(attachList, (item) => lodash.isEmpty(item?.relatedCaseNo))
  ) {
    messageModal({
      code: 'VLD_000885',
      typeCode: 'Label_COM_ErrorMessage',
      dictCode: 'MSG_000906',
    });

    return requestHandleType.break;
  }

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  return errors;
}
