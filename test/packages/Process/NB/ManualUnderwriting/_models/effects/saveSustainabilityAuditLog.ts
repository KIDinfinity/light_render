import lodash from 'lodash';

import saveChangedFields from '@/components/AuditLog/_models/reducers/saveChangedFields';

import { getOptionName } from 'process/NB/ManualUnderwriting/_hooks/useGetButtonSustainabilityOperatorTitle';
import { NAMESPACE } from '../../activity.config';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { optionName } = payload;
  const sustainabilityOptions = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.sustainabilityCheckingData.sustainabilityOptions
  );
  let auditLogControllerStates = yield select(({ auditLogController }: any) => auditLogController);
  lodash.forEach(sustainabilityOptions, (option: any) => {
    const targetPayload = {
      changedFields: {
        applied: {
          value: option.optionName === optionName ? 'Y' : 'N',
          label: getOptionName(option.optionName),
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
      changedFields: auditLogControllerStates.changedFields
    },
  })
}
