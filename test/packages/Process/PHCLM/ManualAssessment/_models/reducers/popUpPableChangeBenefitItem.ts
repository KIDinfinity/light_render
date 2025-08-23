/* eslint-disable no-param-reassign */

/**
 * PopUpPable - 添加 - benefitItem
 * 1. listPolicy获取匹配的policyItem(policyNo/benefitTypeCode/benefitItemCode)
 * 2. 匹配benefitCategory,分类操作
 * 3. 如果类型A/C类型:添加数据
 * 4. 如果类型R：添加server数据
 */
import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { divide } from '@/utils/precisionUtils';
import { findBooster } from '../functions';
import CalculateByPolicyYear from 'basic/enum/CalculateByPolicyYear';
import { getExchangeRateItem } from '../functions';
import { getPolicyItem } from 'basic/utils/PolicyUtils';
const popUpPableChangeBenefitItem = (state: any, { payload }: any) => {
  const { changedFields, benefitItemId, benefitTypecodeAddFlag } = payload;
  const benefitItemCode = formUtils.queryValue(changedFields.benefitItemCode);
  // 不知为啥,生成了一个{name: 'benefitItemCode'},所以会匹配不到
  if (lodash.size(changedFields) !== 1 || !lodash.isString(benefitItemCode)) return state;
  const nextState = produce(state, (draftState: any) => {
    const { claimEntities, popUpPayable, listPolicy } = draftState;

    const {
      policyNo,
      claimDecision,
      benefitTypeCode,
      coverageKey,
      coreProductCode,
      incidentId,
      treatmentId,
    } = formUtils.cleanValidateData(popUpPayable?.basic);

    const policyItem = getPolicyItem({
      listPolicy,
      benefitTypeCode,
      coverageKey,
      coreProductCode,
      benefitItemCode,
      policyNo,
    });
    if (!lodash.isEmpty(policyItem)) {
      const {
        serviceItemPayableListMap,
        treatmentListMap,
        treatmentPayableListMap,
        procedurePayableListMap,
        accidentBenefitPayableListMap,
        claimPayableListMap,
        otherProcedurePayableListMap,
      } = claimEntities;
      const newPolicyItem: any = lodash.pick(policyItem, [
        'benefitTypeCode',
        'coverageKey',
        'benefitItemCode',
        'policyNo',
        'coreProductCode',
        'policyCurrency',
        'productPlan',
        'benefitTypeCode',
        'benefitCategory',
        'isStandaloneBooster',
        'unitType',
      ]);
      const newPayableItem = {
        payableAmount: '',
        payableDays: '',
        isAdd: true,
        calculateByPolicyYear: CalculateByPolicyYear.Y,
        ...lodash.pick(policyItem, ['policyYear', 'isStandaloneBooster']),
        ...getExchangeRateItem(draftState.exchangeRate, policyItem),
      };

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
                  const listTreatmentPayable = lodash
                    .chain(formUtils.cleanValidateData(PayableListMap))
                    .values()
                    .map((item) => ({
                      ...item,
                      coverageKey: claimPayableListMap?.[item?.payableId]?.coverageKey,
                    }))
                    .filter({
                      incidentId,
                      treatmentId: payableItem.treatmentId,
                      policyNo,
                      coverageKey,
                      benefitTypeCode,
                      benefitItemCode,
                    })
                    .value();

                  return !lodash.isEmpty(listTreatmentPayable)
                    ? {
                        id: uuidv4(),
                        isUpdate: true,

                        childrenMap: lodash.reduce(
                          listTreatmentPayable,
                          (obj: any, el: any) => {
                            return {
                              ...obj,
                              [el.id]: {
                                ...lodash.pick(el, ['payableAmount', 'payableDays']),
                                id: el.id,
                                // 这个本身就是treatmentPayable,是不是不需要这个字段
                                treatmentPayableId: el.id,
                                isUpdate: true,
                                policyYear: el.policyYear,
                                ...getExchangeRateItem(draftState.exchangeRate, el),
                              },
                            };
                          },
                          {}
                        ),
                      }
                    : data;
                }
                return data;
              }, {})
              .value();
            const childId = uuidv4();
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
                    childrenMap: {
                      [childId]: {
                        id: childId,
                        ...newPayableItem,
                      },
                    },
                  },
            };
          }, {})
          .value();
      };

      // S类型操作
      const getBenefitCategoryIsSPayableItem = () => {
        const precedureTemp = lodash
          .chain(popUpPayable?.procedure)
          .reduce((collect, procedureItem) => {
            const listPrecedurePayable = lodash
              .chain(formUtils.cleanValidateData(procedurePayableListMap))
              .values()
              .filter({
                incidentId,
                treatmentId,
                procedureId: procedureItem.id,
                policyNo,
                benefitTypeCode,
                benefitItemCode,
              })
              .value();
            let precedureItemTemp = { ...procedureItem };

            if (!lodash.isEmpty(listPrecedurePayable)) {
              precedureItemTemp = {
                id: uuidv4(),
                isUpdate: true,
                procedureId: precedureItemTemp.procedureId,
                ...lodash.pick(procedureItem, ['operationDate', 'procedureCode']),
                childrenMap: lodash.reduce(
                  listPrecedurePayable,
                  (obj: any, el: any) => {
                    return {
                      ...obj,
                      [el.id]: {
                        ...precedureItemTemp,
                        ...el,
                        // TODO:procedureCode 待确定使用payable的还是product的
                        procedureCode: precedureItemTemp.procedureCode,
                        procedurePayableId: el.id,
                        isUpdate: true,
                        ...getExchangeRateItem(draftState.exchangeRate, el),
                      },
                    };
                  },
                  {}
                ),
              };
            } else {
              const childId = uuidv4();
              precedureItemTemp = {
                id: procedureItem.id,
                isAdd: true,
                procedureId: precedureItemTemp.procedureId,
                ...lodash.pick(procedureItem, ['operationDate', 'procedureCode']),
                childrenMap: {
                  [childId]: {
                    id: childId,
                    ...newPayableItem,
                    procedureId: procedureItem.id,
                    ...lodash.pick(procedureItem, ['operationDate', 'procedureCode']),
                  },
                },
              };
            }

            return {
              ...collect,
              [procedureItem.id]: { ...precedureItemTemp },
            };
          }, {})
          .value();

        return {
          ...precedureTemp,
        };
      };

      // CI类型操作
      const getBenefitCategoryIsCIPayableItem = () => {
        const otherprecedureTemp = lodash
          .chain(popUpPayable?.otherProcedure)
          .reduce((collect, otherprecedureItem) => {
            const listPayable = lodash
              .chain(formUtils.cleanValidateData(otherProcedurePayableListMap))
              .values()
              .filter({
                incidentId,
                treatmentId,
                otherProcedureId: otherprecedureItem.id,
                policyNo,
                benefitTypeCode,
                benefitItemCode,
              })
              .value();
            let otherPrecedureItemTemp = { ...otherprecedureItem };

            if (!lodash.isEmpty(listPayable)) {
              otherPrecedureItemTemp = {
                id: uuidv4(),
                isUpdate: true,
                otherProcedureId: otherPrecedureItemTemp.otherProcedureId,
                ...lodash.pick(otherprecedureItem, ['procedureCode']),
                dateOfConsultation: lodash.get(
                  treatmentListMap,
                  `${otherPrecedureItemTemp.treatmentId}.dateOfConsultation`
                ),
                childrenMap: lodash.reduce(
                  listPayable,
                  (obj: any, el: any) => {
                    return {
                      ...obj,
                      [el.id]: {
                        ...otherPrecedureItemTemp,
                        ...el,
                        // TODO:procedureCode 待确定使用payable的还是product的
                        procedureCode: otherPrecedureItemTemp.procedureCode,
                        dateOfConsultation: lodash.get(
                          treatmentListMap,
                          `${otherPrecedureItemTemp.treatmentId}.dateOfConsultation`
                        ),
                        otherProcedurePayableId: el.id,
                        isUpdate: true,
                        ...getExchangeRateItem(draftState.exchangeRate, el),
                      },
                    };
                  },
                  {}
                ),
              };
            } else {
              const childId = uuidv4();
              otherPrecedureItemTemp = {
                id: otherprecedureItem.id,
                isAdd: true,
                otherProcedureId: otherprecedureItem.otherProcedureId,
                dateOfConsultation: lodash.get(
                  treatmentListMap,
                  `${otherPrecedureItemTemp.treatmentId}.dateOfConsultation`
                ),
                ...lodash.pick(otherprecedureItem, ['procedureCode']),
                childrenMap: {
                  [childId]: {
                    id: childId,
                    ...newPayableItem,
                    otherProcedureId: otherprecedureItem.id,
                    dateOfConsultation: lodash.get(
                      treatmentListMap,
                      `${otherPrecedureItemTemp.treatmentId}.dateOfConsultation`
                    ),
                    ...lodash.pick(otherprecedureItem, ['procedureCode']),
                  },
                },
              };
            }

            return {
              ...collect,
              [otherprecedureItem.id]: { ...otherPrecedureItemTemp },
            };
          }, {})
          .value();
        return {
          ...otherprecedureTemp,
        };
      };

      // L类型操作
      const getLifePayableItem = () => {
        const id = uuidv4();
        const childId = uuidv4();
        return {
          [id]: {
            id,
            payableAmount: '',
            payableDays: '',
            isAdd: true,
            childrenMap: {
              [childId]: {
                id: childId,
                claimDecision,
                ...lodash.pick(policyItem, [
                  'policyNo',
                  'benefitTypeCode',
                  'benefitItemCode',
                  'coverageKey',
                  'coreProductCode',
                  'policyYear',
                ]),
              },
            },
          },
        };
      };

      const mapBenefit = {
        [eBenefitCategory.Reimbursement]: () => {
          const { coreProductCode: productCode, productPlan, isStandaloneBooster } = newPolicyItem;
          const serviceTemp = lodash
            .chain(popUpPayable?.service)
            .reduce((collect, serviceItem) => {
              const listServicePayable = lodash
                .chain(formUtils.cleanValidateData(serviceItemPayableListMap))
                .values()
                .map((el: any) => ({
                  ...el,
                  coverageKey: claimPayableListMap[el.payableId].coverageKey,
                }))
                .filter({
                  incidentId,
                  treatmentId,
                  serviceItemId: serviceItem.id,
                  policyNo,
                  benefitTypeCode,
                  coverageKey,
                  benefitItemCode,
                })
                .value();
              let serviceItemTemp = { ...serviceItem };

              if (!lodash.isEmpty(listServicePayable)) {
                const claimPayableItem = claimPayableListMap[listServicePayable[0].payableId];
                serviceItemTemp = {
                  id: uuidv4(),
                  isUpdate: true,
                  serviceItem: serviceItemTemp.serviceItem,
                  serviceItemId: serviceItemTemp.serviceItemId,
                  isStandaloneBooster,
                  childrenMap: lodash.reduce(
                    listServicePayable,
                    (obj: any, el: any) => {
                      const { booster: boosterItem, hasBooster: boosterNotEdible } = findBooster(
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
                          policyYear: el.policyYear,
                        },
                        listPolicy
                      );

                      return {
                        ...obj,
                        [el.id]: {
                          ...serviceItemTemp,
                          ...lodash.pick(el, [
                            'payableAmount',
                            'payableDays',
                            'exchangeRateInvoicePolicy',
                          ]),
                          boosterAmount: boosterItem?.payableAmount,
                          boosterDays: boosterItem?.payableDays,
                          booster: boosterItem?.booster,
                          boosterNotEdible,
                          id: el.id,
                          // 这个本身就是treatmentPayable,是不是不需要这个字段
                          servicePayableId: el.id,
                          policyYear: el.policyYear,
                          isUpdate: true,
                          exchangeRatePolicyPayout: claimPayableItem?.exchangeRatePolicyPayout,
                          payoutToPolicyExchangeRate: divide(
                            1,
                            claimPayableItem?.exchangeRatePolicyPayout
                          ),
                        },
                      };
                    },
                    {}
                  ),
                };
              } else {
                const childId = uuidv4();
                serviceItemTemp = {
                  id: serviceItem.id,
                  isAdd: true,
                  serviceItem: serviceItemTemp.serviceItem,
                  serviceItemId: serviceItemTemp.serviceItemId,
                  isStandaloneBooster,
                  childrenMap: {
                    [childId]: {
                      ...lodash.omit(serviceItemTemp, [
                        'payableAmount',
                        'payableDays',
                        'exchangeRateInvoicePolicy',
                        'boosterAmount',
                        'boosterDays',
                        'booster',
                        'exchangeRatePolicyPayout',
                        'payoutToPolicyExchangeRate',
                        'servicePayableId',
                        'treatmentPayableId',
                        'accidentBenefitPayableId',
                      ]),
                      id: childId,
                      ...newPayableItem,
                    },
                  },
                };
              }

              return {
                ...collect,
                [serviceItem.id]: { ...serviceItemTemp },
              };
            }, {})
            .value();

          return {
            ...serviceTemp,
          };
        },
        [eBenefitCategory.Cashless]: () => {
          return {
            ...getBasePayableItem({
              PayableListMap: formUtils.cleanValidateData(treatmentPayableListMap),
            }),
          };
        },
        [eBenefitCategory.Aipa]: () => {
          return {
            ...getBasePayableItem({
              PayableListMap: formUtils.cleanValidateData(accidentBenefitPayableListMap),
            }),
          };
        },
        [eBenefitCategory.S]: () => {
          return {
            ...getBenefitCategoryIsSPayableItem(),
          };
        },
        [eBenefitCategory.Crisis]: () => {
          return {
            ...getBenefitCategoryIsCIPayableItem(),
          };
        },
        [eBenefitCategory.Life]: () => {
          return {
            ...getLifePayableItem(),
          };
        },
      };
      if (lodash.isFunction(mapBenefit[newPolicyItem?.benefitCategory])) {
        const benefitItem = mapBenefit[newPolicyItem?.benefitCategory]();

        if (benefitTypecodeAddFlag) {
          draftState.popUpPayable.benefitListMap = {}; //一条数据时清完再insert数据
        }
        if (benefitTypecodeAddFlag === 'Delete') return; //多条数据时清完不需要insert
        const id = benefitItemId || uuidv4();
        draftState.popUpPayable.benefitListMap[id] = {
          id,
          ...newPolicyItem,
          listMap: { ...benefitItem },
        };
      }
    }
  });
  return { ...nextState };
};

export default popUpPableChangeBenefitItem;
