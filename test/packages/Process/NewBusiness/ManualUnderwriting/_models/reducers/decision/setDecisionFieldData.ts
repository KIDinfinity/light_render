import { produce } from 'immer';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

import CoverageType from 'process/NewBusiness/ManualUnderwriting/_enum/CoverageType';
import BenefitPlanEditInd from 'process/NewBusiness/ManualUnderwriting/_enum/BenefitPlanEditInd';

const linkCoreCode = ({
  planProductConfig,
  cfgPlanHospitalBenefits,
  coreCode,
  extraFields,
  coverageList,
  isMain,
}: any) => {
  const planProductConfigList = lodash.flattenDeep(planProductConfig);
  const productionAndRider = lodash.concat(
    lodash.get(planProductConfig, 'basicPlanProductFeatureList', []),
    lodash.get(planProductConfig, 'otherPlanProductFeatureList', [])
  );
  const otherPlanProductFeatureList = lodash.get(
    planProductConfig,
    'otherPlanProductFeatureList',
    []
  );

  const isEmptyRequiredRiderCodeList = () =>
    lodash
      .chain(planProductConfigList)
      .find((item: any) => item?.productCode === coreCode)
      .get('requiredRiderCodeList', [])
      .isEmpty()
      .value();
  const needTrigger = ({ conditionFieldKey, conditionFieldValue }: any) =>
    lodash
      .chain(productionAndRider)
      .find((item: any) => item?.productCode === coreCode)
      .get(conditionFieldKey)
      .isEqual(conditionFieldValue)
      .value();
  const needTriggerV2 = () =>
    isMain === CoverageType.Rider &&
    otherPlanProductFeatureList.some((productItem: any) => {
      return (
        productItem?.productCode === coreCode &&
        productItem?.benefitPlanEditInd === BenefitPlanEditInd.FollowBasicProduct
      );
    });
  const getDefaultValue = ({ fieldKey }: any) => {
    const linkProductCode = lodash
      .chain(productionAndRider)
      .find((item: any) => item.productCode === coreCode)
      .get('linkProductCode')
      .value();
    const linkProductDefaultValue = lodash
      .chain(coverageList)
      .find((item: any) => formUtils.queryValue(item.coreCode) === linkProductCode)
      .get('payPeriod')
      .value();
    const baseProductDefaultValue = lodash
      .chain(coverageList)
      .find((item: any) => item.isMain === 'Y')
      .get(fieldKey)
      .value();

    return formUtils.queryValue(linkProductDefaultValue || baseProductDefaultValue);
  };
  const getDefaultValueV2 = ({ targetKey }: any) =>
    lodash.find(coverageList, (item: any) => item?.isMain === 'Y')?.[targetKey];
  const getClearedHospitalPlanCode = () => {
    // 满足条件时清空hospitalPlanCode
    return '';
  };
  const conditionHandler = (item: any) => {
    if (
      lodash.every(item.matchCondition, (condition) => {
        return condition(item);
      })
    ) {
      extraFields[item.fieldKey] = item.getDefaultValue(item);
    }
  };

  const ruleCoreCode = [
    {
      fieldKey: 'payPeriod',
      conditionFieldKey: 'premiumTermFollowCode',
      conditionFieldValue: 'Y',
      conditionHandler,
      getDefaultValue,
      matchCondition: [isEmptyRequiredRiderCodeList, needTrigger],
    },
    {
      fieldKey: 'indemnifyPeriod',
      conditionFieldKey: 'premiumTermFollowCode',
      conditionFieldValue: 'Y',
      conditionHandler,
      getDefaultValue,
      matchCondition: [isEmptyRequiredRiderCodeList, needTrigger],
    },
    {
      fieldKey: 'indemnifyAgePeriod',
      conditionFieldKey: 'policyTermFollowCode',
      conditionFieldValue: 'Y',
      conditionHandler,
      getDefaultValue,
      matchCondition: [isEmptyRequiredRiderCodeList, needTrigger],
    },
    {
      fieldKey: 'sumAssured',
      conditionFieldKey: 'saFollowCode',
      conditionFieldValue: 'Y',
      conditionHandler,
      getDefaultValue,
      matchCondition: [isEmptyRequiredRiderCodeList, needTrigger],
    },
    {
      fieldKey: 'indemnifyPeriodUnit',
      conditionHandler,
      getDefaultValue,
      matchCondition: [isEmptyRequiredRiderCodeList],
    },
    {
      fieldKey: 'payPeriodUnit',
      conditionHandler,
      getDefaultValue,
      matchCondition: [isEmptyRequiredRiderCodeList],
    },
    {
      fieldKey: 'numberOfUnits',
      targetKey: 'unit',
      conditionHandler,
      getDefaultValue: getDefaultValueV2,
      matchCondition: [needTriggerV2],
    },
    {
      fieldKey: 'hospitalPlanCode',
      targetKey: 'hospitalPlanCode',
      conditionHandler,
      getDefaultValue: getDefaultValueV2,
      matchCondition: [needTriggerV2],
    },
    {
      fieldKey: 'hospitalPlanCode',
      conditionFieldKey: 'saFollowCode',
      conditionFieldValue: 'H',
      conditionHandler,
      getDefaultValue: getClearedHospitalPlanCode,
      matchCondition: [needTrigger],
    },
  ];

  lodash.forEach(ruleCoreCode, (item: any) => item.conditionHandler(item));
};

export { linkCoreCode };

export default (state: any, action: any) => {
  const { changedFields, id } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const coverageList = lodash.get(draftState, 'modalData.processData.coverageList', []);
    const index = lodash.findIndex(coverageList, (item: any) => item?.id === id);
    const coverageItem = coverageList[index];
    const planDictProductRegion = lodash.get(draftState, 'planDictProductRegion', []);
    const planProductConfig = lodash.get(draftState, 'planProductConfig');
    const cfgPlanHospitalBenefits = lodash.get(draftState, 'cfgPlanHospitalBenefits');

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
              `modalData.processData.coverageList.[${index}].indemnifyPeriod`,
              value
            );
            if (haveValue) {
              lodash.set(
                draftState,
                `modalData.processData.coverageList.[${index}].indemnifyAgePeriod`,
                null
              );
            }
            break;
          case 'indemnifyAgePeriod':
            lodash.set(
              draftState,
              `modalData.processData.coverageList.[${index}].indemnifyAgePeriod`,
              value
            );
            if (haveValue) {
              lodash.set(
                draftState,
                `modalData.processData.coverageList.[${index}].indemnifyPeriod`,
                null
              );
            }
            break;
          case 'payPeriod':
            lodash.set(
              draftState,
              `modalData.processData.coverageList.[${index}].payPeriod`,
              value
            );
            if (haveValue) {
              lodash.set(
                draftState,
                `modalData.processData.coverageList.[${index}].payAgePeriod`,
                null
              );
            }
            break;
          case 'payAgePeriod':
            lodash.set(
              draftState,
              `modalData.processData.coverageList.[${index}].payAgePeriod`,
              value
            );
            if (haveValue) {
              lodash.set(
                draftState,
                `modalData.processData.coverageList.[${index}].payPeriod`,
                null
              );
            }
            break;
          case 'currencyCode':
            lodash.set(
              draftState,
              'modalData.processData.coverageList',
              lodash.map(
                lodash.get(draftState, 'modalData.processData.coverageList', []),
                (item: any) => {
                  return { ...item, [key]: value };
                }
              )
            );
            break;
          case 'numberOfUnits':
            lodash.set(draftState, `modalData.processData.coverageList.[${index}].unit`, value);
            break;
          case 'deductibleOption':
            lodash.set(
              draftState,
              `modalData.processData.coverageList.[${index}].deductibleOption`,
              formUtils.queryValue(value)
            );
            break;
          case 'laSharingGroupNumber':
            if (haveValue) {
              lodash.set(
                draftState,
                `modalData.processData.coverageList.[${index}].uwProposalHealthFamilySharing.laSharingGroupNumber`,
                value
              );
            } else {
              lodash.set(
                draftState,
                `modalData.processData.coverageList.[${index}].uwProposalHealthFamilySharing`,
                null
              );
            }
            break;
          case 'hospitalPlanCode':
            const roleList = lodash
              .chain(
                draftState.manualundwritingOriginBizData?.policyList?.[0]?.clientInfoList || []
              )
              .reduce((arr: any, item: any) => {
                return [...arr, ...(item?.roleList?.filter((roleData) => !roleData.deleted) || [])];
              }, [])
              .value();
            const { productCode } = draftState.processData?.coverageList[index] || {};

            tenant.region({
              [Region.VN]: () => {
                if (lodash.size(changedFields) === 1) {
                  // 越南HS04 & HS05的特殊处理
                  const productionAndRider = lodash.concat(
                    lodash.get(planProductConfig, 'basicPlanProductFeatureList', []),
                    lodash.get(planProductConfig, 'otherPlanProductFeatureList', [])
                  );
                  const { coreCode } = lodash.get(
                    draftState,
                    `modalData.processData.coverageList.[${index}]`,
                    ''
                  );

                  const saFollowCode = lodash
                    .chain(productionAndRider)
                    .find((item: any) => item.productCode === formUtils.queryValue(coreCode))
                    .get('saFollowCode')
                    .value();

                  if (saFollowCode === 'H') {
                    const currentBenefitConfig = lodash.find(cfgPlanHospitalBenefits, {
                      benefitPlan: formUtils.queryValue(value),
                      productCode: productCode || formUtils.queryValue(coreCode),
                    });

                    if (currentBenefitConfig) {
                      const { sumAssured, annualLimit } = lodash.pick(currentBenefitConfig, [
                        'sumAssured',
                        'annualLimit',
                      ]);

                      lodash.set(
                        draftState,
                        `modalData.processData.coverageList.[${index}].sumAssured`,
                        annualLimit || sumAssured
                      );
                    }
                  }
                }
              },
              [Region.ID]: () => {
                // eslint-disable-next-line @typescript-eslint/no-shadow
                draftState.coverageList.forEach((coverageItem: any, idx: number) => {
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
                      `modalData.processData.coverageList.[${idx}].hospitalPlanCode`,
                      value
                    );
                  }
                });
              },
            });
            lodash.set(
              draftState,
              `modalData.processData.coverageList.[${index}].hospitalPlanCode`,
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
              `modalData.processData.coverageList.[${index}]`,
              {}
            );
            const extraFields = {};

            if (lodash.size(changedFields) === 1 && changedFields.coreCode?.touched) {
              const coreCode = changedFields.coreCode.value;
              extraFields.hospitalPlanCode = '';
              linkCoreCode({
                planProductConfig,
                cfgPlanHospitalBenefits,
                coreCode,
                extraFields,
                coverageList,
                isMain: currentCoverage.isMain,
              });
            }
            lodash.set(draftState, `modalData.processData.coverageList.[${index}]`, {
              ...currentCoverage,
              ...changedFields,
              productType,
              ...extraFields,
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
                  const waive = item?.match(regex)
                    ? item
                    : item.split('-')[0].replace(/^\s+|\s+$/g, '');
                  return {
                    waiveProduct: waive,
                    productCode: coverageItem.productCode,
                  };
                })
                .filter((item) => item?.waiveProduct?.match(regex))
                .value();
            } else {
              newValue = [
                {
                  waiveProduct: val?.match(regex)
                    ? val
                    : val?.split('-')[0].replace(/^\s+|\s+$/g, ''),
                  productCode: coverageItem.productCode,
                },
              ];
            }

            lodash.set(
              draftState,
              `modalData.processData.coverageList.[${index}].waiveProductList`,
              newValue
            );
            break;
          default:
            lodash.set(draftState, `modalData.processData.coverageList.[${index}]`, {
              ...lodash.get(draftState, `modalData.processData.coverageList.[${index}]`, {}),
              ...changedFields,
            });
            break;
        }
      })
      .value();
  });
  return { ...nextState };
};
