import lodash from 'lodash';
import { notification } from 'antd';
import { addPolicyNotes } from '@/services/c360PolicyInfoControllerService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { handleErrorMessageIgnoreXErrorNotice, messageModal } from '@/utils/commonMessage';
import { formUtils } from 'basic/components/Form';

export default function* ({ payload }: any, { select, put, call }: any): Generator<any, any, any> {
  const linkedPolicyForms = lodash.get(payload, 'linkedPolicyForms');
  const policyNoList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.policyNoList
  ) || [];
  const businessCode = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail?.businessCode
  ) || {};
  const clientInfoList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities.clientMap
  ) || {};
  const keyClientIds = lodash.chain(clientInfoList).map('laClientId').value();
  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(linkedPolicyForms),
    force: true,
  });
  if (errors?.length > 0 || lodash.compact(policyNoList).length === 0) {
    messageModal({
      typeCode: 'Label_COM_ErrorMessage',
      dictCode: 'MSG_000926',
    });
    return;
  }
  const response = yield call(addPolicyNotes, {
    businessCode,
    keyClientIds,
    policyNoList,
  });
  const { success } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    yield put({
      type: 'insured360/getCustomerTypeConfig',
    });
    yield put({
      type: 'setAddLinkedPolicyModalVisible',
      payload: {
        visible: false,
      },
    });
    notification.success({
      message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_001069' }),
    });
  } else {
    handleErrorMessageIgnoreXErrorNotice(response);
  }
}
