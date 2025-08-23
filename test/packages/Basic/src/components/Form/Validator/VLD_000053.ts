/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000053 = (state: any, action: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, incidentId, addDiagnosisItem } = action.payload;
    if (
      (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'diagnosisCode')) ||
      addDiagnosisItem
    ) {
      const dumplicateCodes = lodash
        .chain(draftState.claimEntities.diagnosisListMap)
        .map((item) => ({
          ...item,
          diagnosisCode: formUtils.queryValue(item.diagnosisCode),
        }))
        .groupBy('diagnosisCode')
        .toPairs()
        .map(([key, value]: any) => (value.length > 1 ? key : ''))
        .compact()
        .value();

      lodash
        .chain(draftState.claimEntities.diagnosisListMap)
        .filter((item) => item.incidentId === incidentId)
        .forEach((diagnosis: any) => {
          const originData = lodash.isObject(diagnosis.diagnosisCode)
            ? diagnosis.diagnosisCode
            : { value: diagnosis.diagnosisCode };

          if (dumplicateCodes.includes(formUtils.queryValue(diagnosis.diagnosisCode))) {
            const errors = lodash.isArray(originData.errors) ? [...originData.errors] : [];
            if (!lodash.some(errors, (item) => item.id === 'dumplicate')) {
              errors.push({
                message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000017' }),
                field: 'diagnosisCode',
                id: 'dumplicate',
              });
            }
            draftState.claimEntities.diagnosisListMap[diagnosis.id] = {
              ...draftState.claimEntities.diagnosisListMap[diagnosis.id],
              diagnosisCode: {
                ...originData,
                errors,
              },
            };
          } else {
            const errors = lodash.filter(originData.errors, (item) => item?.id !== 'dumplicate');
            draftState.claimEntities.diagnosisListMap[diagnosis.id] = {
              ...draftState.claimEntities.diagnosisListMap[diagnosis.id],
              diagnosisCode: {
                ...originData,
                errors: errors.length ? errors : null,
              },
            };
          }
        })
        .value();
    }
  });
