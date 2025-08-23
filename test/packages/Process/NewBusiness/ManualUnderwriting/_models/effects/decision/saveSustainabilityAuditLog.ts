import lodash from 'lodash';

import saveChangedFields from '@/components/AuditLog/_models/reducers/saveChangedFields';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default function* ({ payload }: any, { put, select }: any) {
  const { optionName } = payload;
  // @ts-ignore
  const sustainabilityOptions = yield select(
    ({ [NAMESPACE]: modelNamespace }: any) =>
      modelNamespace.sustainabilityModal.sustainabilityOptions
  );
  // @ts-ignore
  let auditLogControllerStates = yield select(({ auditLogController }: any) => auditLogController);
  lodash.forEach(sustainabilityOptions, (option: any) => {
    const targetPayload = {
      changedFields: {
        applied: {
          value: option.optionName === optionName ? 'Y' : 'N',
          label: option.title,
          name: 'applied',
        },
      },
      id: option.id,
      indicator: 'sustainability',
    };
    auditLogControllerStates = saveChangedFields(auditLogControllerStates, {
      type: 'auditLogController/saveChangedFields',
      payload: targetPayload,
    });
  });

  yield put({
    type: 'auditLogController/saveChangedFieldsForList',
    payload: {
      changedFields: auditLogControllerStates.changedFields,
    },
  });
}
