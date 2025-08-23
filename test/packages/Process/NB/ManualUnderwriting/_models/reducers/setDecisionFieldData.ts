import { produce } from 'immer';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

// const sumAssuredTargetSelector = (coverageIndex: number, hospitalPlanCode: { value: string }) => (
//   state: any
// ) => {
//   const cfgPlanHospitalBenefits = state.cfgPlanHospitalBenefits;

//   const currentCoverage = lodash.get(
//     state,
//     `businessData.policyList[0].coverageList.[${coverageIndex}]`,
//     {}
//   );
//   const productCode = currentCoverage.coreCode.value || currentCoverage.coreCode;

//   const target = lodash.find(cfgPlanHospitalBenefits, {
//     productCode,
//     benefitPlan: hospitalPlanCode.value,
//   });

//   const annualLimit = Number(
//     !lodash.isNil(target?.annualLimit) ? target?.annualLimit : currentCoverage.sumAssured
//   );

//   const regionCode = tenant.region();
//   const subProductTypeMD = currentCoverage.subProductType === 'MD';

//   if (regionCode === Region.ID) {
//     return currentCoverage.sumAssured;
//   }
//   if (subProductTypeMD) {
//     return annualLimit;
//   }
//   return currentCoverage.sumAssured;
// };

export default (state: any, action: any) => {
  const { changedFields, id } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'stepsChange.PlanInfo', true);
    const coverageList = lodash.get(draftState, 'businessData.policyList[0].coverageList', []);
    const index = lodash.findIndex(coverageList, (item: any) => item?.id === id);
    const planDictProductRegion = lodash.get(draftState, 'planDictProductRegion', []);
    lodash
      .chain(changedFields)
      .entries()
      .forEach((fieldItem) => {
        const [key, value] = fieldItem;
        const haveValue = lodash.isNumber(formUtils.queryValue(value))
          ? true
          : !lodash.isEmpty(formUtils.queryValue(value));
        switch (key) {
          case 'indemnifyPeriod':
            lodash.set(
              draftState,
              `businessData.policyList[0].coverageList.[${index}].indemnifyPeriod`,
              value
            );
            if (haveValue) {
              lodash.set(
                draftState,
                `businessData.policyList[0].coverageList.[${index}].indemnifyAgePeriod`,
                null
              );
            }
            break;
          case 'indemnifyAgePeriod':
            lodash.set(
              draftState,
              `businessData.policyList[0].coverageList.[${index}].indemnifyAgePeriod`,
              value
            );
            if (haveValue) {
              lodash.set(
                draftState,
                `businessData.policyList[0].coverageList.[${index}].indemnifyPeriod`,
                null
              );
            }
            break;
          case 'payPeriod':
            lodash.set(
              draftState,
              `businessData.policyList[0].coverageList.[${index}].payPeriod`,
              value
            );
            if (haveValue) {
              lodash.set(
                draftState,
                `businessData.policyList[0].coverageList.[${index}].payAgePeriod`,
                null
              );
            }
            break;
          case 'payAgePeriod':
            lodash.set(
              draftState,
              `businessData.policyList[0].coverageList.[${index}].payAgePeriod`,
              value
            );
            if (haveValue) {
              lodash.set(
                draftState,
                `businessData.policyList[0].coverageList.[${index}].payPeriod`,
                null
              );
            }
            break;
          case 'currencyCode':
            lodash.set(
              draftState,
              'businessData.policyList[0].coverageList',
              lodash.map(
                lodash.get(draftState, 'businessData.policyList[0].coverageList', []),
                (item: any) => {
                  return { ...item, [key]: value };
                }
              )
            );
            break;
          case 'numberOfUnits':
            lodash.set(
              draftState,
              `businessData.policyList[0].coverageList.[${index}].unit`,
              value
            );
            break;
          case 'laSharingGroupNumber':
            lodash.set(
              draftState,
              `businessData.policyList[0].coverageList.[${index}].uwProposalHealthFamilySharing.laSharingGroupNumber`,
              formUtils.queryValue(value)
            );

            if (!haveValue) {
              lodash.set(
                draftState,
                `businessData.policyList[0].coverageList.[${index}].uwProposalHealthFamilySharing`,
                null
              );
            }
            break;
          case 'hospitalPlanCode':
            const roleList = lodash
              .chain(draftState.originBizData?.policyList?.[0]?.clientInfoList || [])
              .reduce((arr: any, item: any) => {
                return [...arr, ...(item.roleList?.filter((roleData) => !roleData.deleted) || [])];
              }, [])
              .value();
            const { productCode } = draftState.businessData.policyList[0].coverageList[index] || {};

            tenant.region({
              [Region.ID]: () => {
                draftState.businessData.policyList[0].coverageList.forEach(
                  (coverageItem: any, idx: number) => {
                    const groupItem = lodash
                      .chain(coverageItem?.coverageInsuredList)

                      .reduce((isGroup: boolean, insuredItem: any) => {
                        const matchRule = lodash.find(
                          roleList,
                          (el: any) =>
                            insuredItem.clientId === el.clientId &&
                            coverageItem.productCode === productCode
                        );

                        return !!matchRule && coverageItem.isMain === 'Y' ? true : isGroup;
                      }, false)
                      .value();

                    if (!!groupItem) {
                      lodash.set(
                        draftState,
                        `businessData.policyList[0].coverageList.[${idx}].hospitalPlanCode`,
                        value
                      );
                    }
                  }
                );
              },
            });
            // const sumAssuredTarget = sumAssuredTargetSelector(index, value)(draftState);
            // // 查不到对应值时保留初始值
            // if (sumAssuredTarget || sumAssuredTarget === 0) {
            //   lodash.set(
            //     draftState,
            //     `businessData.policyList[0].coverageList.[${index}].sumAssured`,
            //     sumAssuredTarget
            //   );
            // }
            lodash.set(
              draftState,
              `businessData.policyList[0].coverageList.[${index}].hospitalPlanCode`,
              formUtils.queryValue(value)
            );
            break;
          case 'coreCode':
            const productType = lodash
              .chain(planDictProductRegion)
              .find((item) => item.productCode === formUtils.queryValue(value))
              .get('productType')
              .value();
            const currentCoverage = lodash.get(
              draftState,
              `businessData.policyList[0].coverageList.[${index}]`,
              {}
            );
            lodash.set(draftState, `businessData.policyList[0].coverageList.[${index}]`, {
              ...currentCoverage,
              ...changedFields,
              productType,
            });
            break;
          case 'waiveProductList':
            const val = formUtils.queryValue(value);
            const isArr = lodash.isArray(formUtils.queryValue(value));
            const regex = '^[a-zA-Z0-9]{4}$'; // match productCode format
            let newValue;

            if (isArr) {
              newValue = lodash
                .chain(val)
                .map((item) => {
                  return item?.match(regex) ? item : item.split('-')[0].replace(/^\s+|\s+$/g, '');
                })
                .filter((item) => item?.match(regex))
                .value();
            } else {
              newValue = val?.match(regex) ? val : val?.split('-')[0].replace(/^\s+|\s+$/g, '');
            }

            lodash.set(
              draftState,
              `businessData.policyList[0].coverageList.[${index}].waiveProductList`,
              newValue
            );
            break;
          default:
            lodash.set(draftState, `businessData.policyList[0].coverageList.[${index}]`, {
              ...lodash.get(draftState, `businessData.policyList[0].coverageList.[${index}]`, {}),
              ...changedFields,
            });
            break;
        }
      })
      .value();
  });
  return { ...nextState };
};
