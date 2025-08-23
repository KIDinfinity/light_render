/* eslint-disable no-param-reassign */

/**
 * PopUpPable - 更新 - benefitiList
 */

import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { divide } from '@/utils/precisionUtils';
import { findBooster } from '../functions';

const popUpPableUpdateBenefitItem = (state: any, { payload }: any) => {
  const { changedFields, id } = payload;

  const nextState = produce(state, (draftState: any) => {
    const { claimEntities, popUpPayable, listPolicy } = draftState;

    const { policyNo, benefitTypeCode, incidentId, treatmentId } = formUtils.cleanValidateData(
      popUpPayable?.basic
    );

    // TODO:这部分的逻辑和popUpPableAddBenefitItem重复了,需要抽取
    if (lodash.has(changedFields, 'benefitItemCode') && lodash.size(changedFields) === 1) {
      const benefitItemCode = formUtils.queryValue(changedFields?.benefitItemCode);
      const policyItem = lodash.find(listPolicy, { benefitTypeCode, benefitItemCode, policyNo });

      if (!lodash.isEmpty(policyItem)) {
        const {
          serviceItemPayableListMap,
          treatmentListMap,
          treatmentPayableListMap,
          accidentBenefitPayableListMap,
          claimPayableListMap,
        } = claimEntities;
        const newPolicyItem = lodash.pick(policyItem, [
          'benefitTypeCode',
          'benefitItemCode',
          'policyNo',
          'policyNo',
          'coreProductCode',
          'policyCurrency',
          'productPlan',
          'benefitTypeCode',
          'benefitCategory',
        ]);

        // A/C类型操作
        const getBasePayableItem = ({ PayableListMap }: any) => {
          /**
           * 1. 遍历treatmentListMap(value) ->id
           * 2. 遍历PayableListMap ->找到treatmentId
           * 3. 找到treatmentId === id (list)
           * 4. 根据规则匹配是否已经存在
           * 5. 存在:设置pabable
           * 6. 不存在:新建一条
           */

          return lodash
            .chain(formUtils.cleanValidateData(treatmentListMap))
            .values()
            .reduce((treatmentItem, { id }) => {
              const treatmentPayable = lodash
                .chain(PayableListMap)
                .values()
                .reduce((data, payableItem) => {
                  if (payableItem.treatmentId === id) {
                    const matchingPayable = lodash
                      .chain(formUtils.cleanValidateData(PayableListMap))
                      .values()
                      .find({
                        incidentId,
                        treatmentId: payableItem.treatmentId,
                        policyNo,
                        benefitTypeCode,
                        productCode: newPolicyItem.coreProductCode,
                        benefitItemCode,
                      })
                      .value();

                    return !lodash.isEmpty(matchingPayable)
                      ? {
                          ...lodash.pick(matchingPayable, [
                            // 'id',
                            'payableAmount',
                            'payableDays',
                            'exchangeRateInvoicePolicy',
                          ]),
                          isUpdate: true,
                          treatmentPayableId: matchingPayable.id,
                          exchangeRatePolicyPayout:
                            claimPayableListMap[payableItem?.payableId]?.exchangeRatePolicyPayout,
                          payoutToPolicyExchangeRate: divide(
                            1,
                            claimPayableListMap[payableItem?.payableId]?.exchangeRatePolicyPayout
                          ),
                        }
                      : data;
                  }
                  return data;
                }, {})
                .value();

              return {
                ...treatmentItem,
                [id]: !lodash.isEmpty(treatmentPayable)
                  ? {
                      ...treatmentPayable,
                    }
                  : {
                      id,
                      payableAmount: '',
                      payableDays: '',
                      isAdd: true,
                    },
              };
            }, {})
            .value();
        };

        const mapBenefit = {
          [eBenefitCategory.Reimbursement]: () => {
            const { coreProductCode: productCode, productPlan } = newPolicyItem;
            const serviceTemp = lodash
              .chain(popUpPayable?.service)
              .reduce((collect, serviceItem, key) => {
                const supplementPayable = lodash
                  .chain(formUtils.cleanValidateData(serviceItemPayableListMap))
                  .values()
                  .find({
                    incidentId,
                    treatmentId,
                    serviceItemId: serviceItem.id,
                    policyNo,
                    benefitTypeCode,
                    productCode,
                    benefitItemCode,
                  })
                  .value();

                let serviceItemTemp = { ...serviceItem };

                const { booster, hasBooster: boosterNotEdible } = findBooster(
                  serviceItemPayableListMap,
                  {
                    incidentId,
                    treatmentId,
                    serviceItemId: serviceItem.id,
                    policyNo,
                    benefitTypeCode,
                    productCode,
                    benefitItemCode,
                    productPlan,
                  },
                  listPolicy
                );

                if (!lodash.isEmpty(supplementPayable)) {
                  const payableItem = claimPayableListMap[supplementPayable?.payableId];
                  serviceItemTemp = {
                    ...serviceItemTemp,
                    ...lodash.pick(supplementPayable, [
                      'payableAmount',
                      'payableDays',
                      'exchangeRateInvoicePolicy',
                    ]),
                    ...lodash.pick(booster, ['boosterAmount', 'boosterDays', 'booster']),
                    boosterNotEdible,
                    servicePayableId: supplementPayable.id,
                    isUpdate: true,
                    exchangeRatePolicyPayout: payableItem?.exchangeRatePolicyPayout,
                    payoutToPolicyExchangeRate: divide(1, payableItem?.exchangeRatePolicyPayout),
                    chooise: serviceItemTemp?.chooise ? false : serviceItemTemp?.chooise,
                  };
                } else {
                  serviceItemTemp = {
                    ...lodash.omit(serviceItemTemp, [
                      'payableAmount',
                      'payableDays',
                      'exchangeRateInvoicePolicy',
                      'boosterAmount',
                      'boosterDays',
                      'booster',
                      'exchangeRatePolicyPayout',
                      'payoutToPolicyExchangeRate',
                      'isUpdate',
                      'servicePayableId',
                      'treatmentPayableId',
                      'accidentBenefitPayableId',
                    ]),
                    chooise: serviceItemTemp?.chooise ? false : serviceItemTemp?.chooise,
                    payableAmount: serviceItemTemp?.payableAmount
                      ? null
                      : serviceItemTemp?.payableAmount,
                    boosterNotEdible,
                  };
                }

                return {
                  ...collect,
                  [`${key}`]: { ...serviceItemTemp },
                };
              }, {})
              .value();
            return {
              listMap: {
                ...serviceTemp,
              },
            };
          },
          [eBenefitCategory.Cashless]: () => {
            return {
              listMap: {
                ...getBasePayableItem({
                  PayableListMap: formUtils.cleanValidateData(treatmentPayableListMap),
                }),
              },
            };
          },
          [eBenefitCategory.Aipa]: () => {
            return {
              listMap: {
                ...getBasePayableItem({
                  PayableListMap: formUtils.cleanValidateData(accidentBenefitPayableListMap),
                }),
              },
            };
          },
        };

        if (lodash.isFunction(mapBenefit[newPolicyItem?.benefitCategory])) {
          const benefitItem = mapBenefit[newPolicyItem?.benefitCategory]();

          draftState.popUpPayable.benefitListMap[id] = {
            id,
            ...newPolicyItem,
            ...benefitItem,
          };
        }
      }
    }
  });

  return { ...nextState };
};

export default popUpPableUpdateBenefitItem;
