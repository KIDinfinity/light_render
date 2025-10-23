import { produce } from 'immer';
import lodash from 'lodash';
import { Validator, formUtils } from 'basic/components/Form';
import { SourceSystem } from 'process/Enum';

const getpolicyListValue = ({ draftState, changedFields }: any, fieldName: string) => {
  return lodash
    .chain(draftState.listPolicy || [])
    .find((el: any) => el.policyNo === formUtils.queryValue(changedFields.policyId))
    .get(fieldName)
    .value();
};

const klipCaseInfoUpdate = (state: any, action: any) => {
  const { id, changedFields, incidentId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const path = `popupData.klipCaseInfoList`;
    lodash.set(
      draftState,
      path,
      lodash.map(lodash.get(draftState, path, []), (item) => {
        return item?.id === id ? { ...item, ...changedFields } : item;
      })
    );

    if (lodash.size(changedFields) === 1) {
      const { claimNo, informationPerfectionDate } = draftState.claimProcessData || {};
      const claimTypeArray = formUtils.queryValue(
        draftState.claimEntities?.incidentListMap?.[incidentId]?.claimTypeArray
      );
      const klipCaseInfoList = draftState.popupData.klipCaseInfoList;
      draftState.popupData.klipCaseInfoList = lodash.map(klipCaseInfoList, (item: any) => {
        let extra = {};
        if (lodash.has(changedFields, 'policyId')) {
          const sourceSystem = getpolicyListValue({ draftState, changedFields }, 'sourceSystem');
          const insured10ConsecDaysHospFlag = getpolicyListValue(
            { draftState, changedFields },
            'insured10ConsecDaysHospFlag'
          );

          extra = {
            sourceSystem,
            incidentId,
            tenDaysHospitalizationFlg: insured10ConsecDaysHospFlag === '1' ? 'Y' : '',
          };

          if (sourceSystem === SourceSystem.Lifej) {
            extra = {
              ...extra,
              interestBasedDate: informationPerfectionDate,
              interestFlag:
                lodash.isEmpty(formUtils.queryValue(item.interestFlag)) &&
                !lodash.includes(claimTypeArray, 'WOP')
                  ? 'Y'
                  : item.interestFlag,
            };
          }
        }

        if (lodash.has(changedFields, 'klipClaimNo')) {
          const klipCaseInfoList = draftState.popupData.klipCaseInfoList;
          const klipClaimNoValue = formUtils.queryValue(item.klipClaimNo);

          const validateKlipClaimNo = Validator.validateKlipClaimNo(
            klipCaseInfoList,
            item?.id,
            claimNo
          )([], klipClaimNoValue, () => {});

          extra = {
            klipClaimNo: validateKlipClaimNo
              ? {
                  value: klipClaimNoValue,
                  errors: [
                    {
                      message: validateKlipClaimNo,
                      field: 'klipClaimNo',
                    },
                  ],
                  name: 'klipClaimNo',
                  dirty: false,
                  touched: true,
                  validating: false,
                }
              : item.klipClaimNo,
          };
        }

        return item?.id === id
          ? {
              ...item,
              ...extra,
            }
          : item;
      });
    }
  });

  return { ...nextState };
};

export default klipCaseInfoUpdate;
