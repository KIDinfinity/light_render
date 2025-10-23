/* eslint-disable no-param-reassign */

/**
 * PopUpPable - 添加 - benefitItem
 * 1. listPolicy获取匹配的policyItem(policyNo/benefitTypeCode/benefitItemCode)
 * 2. 匹配benefitCategory,分类操作
 * 3. 如果类型A/C类型:添加数据
 * 4. 如果类型R：添加server数据
 */
import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { divide } from '@/utils/precisionUtils';
import CalculateByPolicyYear from 'basic/enum/CalculateByPolicyYear';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { getPolicyItem } from 'basic/utils/PolicyUtils';
import { getExchangeRateItem } from 'basic/utils';
import { BenefitSubCategory } from 'claim/pages/utils/claim';

const benefitCategoryMapProcedureType = {
  [eBenefitCategory.T]: ['RT'],
  [eBenefitCategory.CIC]: ['DG1', 'DG2'],
};

const popUpPableChangeBenefitItem = (state: any, { payload }: any) => {
  const { changedFields, benefitItemId } = payload;

  const benefitItemCode = formUtils.queryValue(changedFields.benefitItemCode);

  // 不知为啥,生成了一个{name: 'benefitItemCode'},所以会匹配不到
  if (lodash.size(changedFields) !== 1 || !lodash.isString(benefitItemCode)) return state;

  const nextState = produce(state, (draftState: any) => {
    const { claimEntities, popUpPayable, listPolicy } = draftState;

    const { policyNo, benefitTypeCode, coverageKey, incidentId, treatmentId } =
      formUtils.cleanValidateData(popUpPayable?.basic);

    // const policyList = getPolicyForBenefitItemCodeList({
    //   listPolicy,
    //   benefitTypeCode,
    //   coverageKey,
    //   benefitItemCode,
    //   policyNo,
    // });

    const policyItem = getPolicyItem({
      listPolicy,
      benefitTypeCode,
      coverageKey,
      benefitItemCode,
      policyNo,
    });

    if (!lodash.isEmpty(policyItem)) {
      // 在load 左侧treatment/OPT/procedure和右侧payable时过滤掉属于adjustment的数据
      // 在实际confirm的时候时做增量/修改处理，所以这里即便筛掉了adjustment数据，理论上也不会导致confirm时有adjustment数据被覆盖
      const filteredClaimEntities = lodash.mapValues(claimEntities, (map) => {
        return lodash.pickBy(map, (mapItem) => mapItem.isAdjustment !== IsAdjustment.Yes);
      });
      const {
        serviceItemPayableListMap,
        treatmentListMap,
        opTreatmentPayableListMap,
        treatmentPayableListMap,
        procedurePayableListMap,
        accidentBenefitPayableListMap,
        claimPayableListMap,
        otherProcedureListMap,
        otherProcedurePayableListMap,
        incidentListMap,
        claimIncidentPayableListMap,
      } = filteredClaimEntities;
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
        'benefitSubCategory',
        'isStandaloneBooster',
        'unitType',
      ]);

      const newPayableItem = {
        payableAmount: '',
        payableDays: '',
        isAdd: true,
        calculateByPolicyYear: CalculateByPolicyYear.Y,
        ...lodash.pick(policyItem, ['policyYear']),
      };

      const treatmentListMapValue = formUtils.cleanValidateData(treatmentListMap);

      // A/C类型操作
      const getBasePayableItem = ({ PayableListMap, treatmentType }: any) => {
        /**
         * 1. 遍历treatmentListMap(value) ->id && treatmentType
         * 2. 遍历PayableListMap ->找到treatmentId
         * 3. 找到treatmentId === id (list)
         * 4. 根据规则匹配是否已经存在
         * 5. 存在:设置pabable
         * 6. 不存在:新建一条
         */

        return lodash
          .chain(treatmentListMapValue)
          .reduce((filterIncidentIdTreatmentListMap, item, key) => {
            return incidentId === item?.incidentId &&
              (treatmentType ? item?.treatmentType === treatmentType : !treatmentType)
              ? { ...filterIncidentIdTreatmentListMap, [key]: item }
              : filterIncidentIdTreatmentListMap;
          }, {})
          .values()
          .reduce((treatmentItem, { id }) => {
            const listMapId = uuidv4();
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
                        id: listMapId,
                        isUpdate: true,

                        childrenMap: lodash.reduce(
                          listTreatmentPayable,
                          (obj: any, el: any) => {
                            return {
                              ...obj,
                              [el.id]: {
                                ...lodash.pick(el, [
                                  'payableAmount',
                                  'payableDays',
                                  'dateOfAdmission',
                                  'dateOfDischarge',
                                  'treatmentId',
                                  'incidentId',
                                  'id',
                                  'policyYear',
                                ]),

                                // 这个本身就是treatmentPayable,是不是不需要这个字段
                                treatmentPayableId: el.id,

                                isUpdate: true,

                                treatmentNo: treatmentListMap?.[el?.treatmentId]?.treatmentNo,
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
              [listMapId]: !lodash.isEmpty(treatmentPayable)
                ? {
                    ...treatmentPayable,
                  }
                : {
                    id: listMapId,
                    payableAmount: '',
                    payableDays: '',
                    isAdd: true,
                    childrenMap: {
                      [childId]: {
                        id: childId,
                        ...newPayableItem,
                        treatmentId: id,
                        ...lodash.pick(treatmentListMapValue?.[id], [
                          'treatmentNo',
                          'dateOfAdmission',
                          'dateOfDischarge',
                          'incidentId',
                        ]),
                      },
                    },
                  },
            };
          }, {})
          .value();
      };

      // C OP类型操作
      const getOPPayableItem = ({ treatmentType }: any) => {
        /** TODO: add comment
         * 1. 遍历treatmentListMap(value) ->id && treatmentType
         * 2. 遍历PayableListMap ->找到treatmentId
         * 3. 找到treatmentId === id (list)
         * 4. 根据规则匹配是否已经存在
         * 5. 存在:设置pabable
         * 6. 不存在:新建一条
         */
        const treatmentList = lodash.values(treatmentListMapValue);

        return treatmentList.reduce((listMap, treatmentItem) => {
          if (
            treatmentItem.incidentId !== incidentId ||
            treatmentItem.treatmentType !== treatmentType
          )
            return listMap;
          const res = { ...listMap };
          treatmentItem.opTreatmentList?.map((opTreatmentItem) => {
            const listMapId = uuidv4();
            const matchedPayable = lodash
              .chain(formUtils.cleanValidateData(opTreatmentPayableListMap))
              .values()
              .map((item) => ({
                ...item,
                coverageKey: claimPayableListMap?.[item?.payableId]?.coverageKey,
              }))
              .filter({
                incidentId,
                treatmentId: treatmentItem.id,
                policyNo,
                coverageKey,
                benefitTypeCode,
                benefitItemCode,
                opTreatmentId: opTreatmentItem.id,
                dateOfConsultation: opTreatmentItem.outpatientTreatmentDate,
              })
              .value();

            if (matchedPayable?.length) {
              res[listMapId] = {
                id: listMapId,
                isUpdate: true,
                childrenMap: lodash.reduce(
                  matchedPayable,
                  (obj: any, el: any) => {
                    return {
                      ...obj,
                      [el.id]: {
                        ...lodash.pick(el, [
                          'payableAmount',
                          'payableDays',
                          'dateOfConsultation',
                          'treatmentId',
                          'incidentId',
                          'opTreatmentId',
                          'id',
                          'policyYear',
                        ]),
                        isUpdate: true,
                        treatmentNo: treatmentItem.treatmentNo,
                      },
                    };
                  },
                  {}
                ),
              };
            } else {
              const childId = uuidv4();
              res[listMapId] = {
                id: listMapId,
                payableAmount: '',
                payableDays: '',
                isAdd: true,
                childrenMap: {
                  [childId]: {
                    id: childId,
                    ...newPayableItem,
                    treatmentId: treatmentItem.id,
                    opTreatmentId: opTreatmentItem.id,
                    treatmentNo: treatmentItem.treatmentNo,
                    dateOfConsultation: opTreatmentItem.outpatientTreatmentDate,
                    incidentId,
                  },
                },
              };
            }
          });
          return res;
        }, {});
      };

      // S类型操作
      const getBenefitCategoryIsSPayableItem = () => {
        const precedureTemp = lodash
          .chain(popUpPayable?.procedure)
          .filter((item) => {
            const treatmentList = incidentListMap?.[incidentId]?.treatmentList;
            return lodash.includes(treatmentList, item?.treatmentId);
          })
          .reduce((collect, procedureItem) => {
            const listPrecedurePayable = lodash
              .chain(formUtils.cleanValidateData(procedurePayableListMap))
              .values()
              .filter({
                incidentId,
                treatmentId: procedureItem.treatmentId,
                procedureId: procedureItem.id,
                policyNo,
                benefitTypeCode,
                benefitItemCode,
              })
              .value();
            let precedureItemTemp = { ...procedureItem };

            if (!lodash.isEmpty(listPrecedurePayable)) {
              precedureItemTemp = {
                id: procedureItem.id || uuidv4(),
                isUpdate: true,
                procedureId: precedureItemTemp.procedureId,
                ...lodash.pick(procedureItem, ['operationDate', 'procedureCode', 'procedureName']),
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
                        treatmentNo: treatmentListMap?.[el?.treatmentId]?.treatmentNo,
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
                ...lodash.pick(procedureItem, ['operationDate', 'procedureCode', 'procedureName']),
                childrenMap: {
                  [childId]: {
                    id: childId,
                    ...newPayableItem,
                    procedureId: procedureItem.id,
                    treatmentId: procedureItem?.treatmentId,
                    ...lodash.pick(procedureItem, [
                      'operationDate',
                      'procedureCode',
                      'procedureName',
                      'kjCode',
                    ]),
                    ...lodash.pick(treatmentListMapValue?.[procedureItem?.treatmentId], [
                      'treatmentNo',
                      'incidentId',
                    ]),
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

      // CI、T、CIC类型操作
      const getBenefitCategoryIsCIPayableItem = () => {
        const otherprecedureTemp = lodash
          .chain(formUtils.cleanValidateData(popUpPayable?.otherProcedure))
          .reduce((collect, otherprecedureItem) => {
            const isBenefitCategoryMapProcedureType = lodash.includes(
              benefitCategoryMapProcedureType?.[newPolicyItem?.benefitCategory] || [],
              otherprecedureItem?.procedureType
            );
            if (!isBenefitCategoryMapProcedureType) {
              return collect;
            }

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
                id: otherprecedureItem.id || uuidv4(),
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
                        ...lodash.pick(treatmentListMap?.[el?.treatmentId], [
                          'treatmentNo',
                          'incidentId',
                        ]),
                        otherProcedureId: el?.otherProcedureId,
                        ...lodash.pick(otherProcedureListMap?.[el?.otherProcedureId], [
                          'procedureType',
                        ]),
                        ...getExchangeRateItem(draftState.exchangeRate, el),
                        orderNum: otherprecedureItem?.orderNum,
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
                    ...lodash.pick(treatmentListMap?.[otherPrecedureItemTemp?.treatmentId], [
                      'treatmentNo',
                      'incidentId',
                    ]),
                    ...lodash.pick(otherprecedureItem, [
                      'procedureCode',
                      'treatmentId',
                      'incidentId',
                      'procedureType',
                      'orderNum',
                    ]),
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
      const getBaseLifeItem = () => {
        const incidentListMapValue = formUtils.cleanValidateData(incidentListMap);
        const claimPayableListMapValue = formUtils.cleanValidateData(claimPayableListMap);

        return lodash
          .chain(incidentListMapValue)
          .filter((item) => item.id === incidentId)
          .values()
          .reduce((incidentItem: object, { id }: any) => {
            const listMapId = uuidv4();

            const lifePayable = lodash
              .chain(claimPayableListMapValue)
              .reduce((lifePayableMap, item) => {
                return item?.incidentId === id
                  ? { ...lifePayableMap, [item?.lifePayable?.id]: item?.lifePayable }
                  : lifePayableMap;
              }, {})
              .values()
              .reduce((data, payableItem: any) => {
                const listLifePayable = lodash
                  .chain(claimPayableListMapValue)
                  .reduce((lifePayableMap, item) => {
                    return item?.incidentId === id
                      ? {
                          ...lifePayableMap,
                          [item?.lifePayable?.id]: {
                            ...item?.lifePayable,
                            claimPayableId: item?.id,
                          },
                        }
                      : lifePayableMap;
                  }, {})
                  .values()
                  .value();

                return !lodash.isEmpty(payableItem)
                  ? {
                      id: listMapId,
                      isUpdate: true,
                      childrenMap: lodash.reduce(
                        listLifePayable,
                        (obj: any, el: any) => {
                          return {
                            ...obj,
                            [el.id]: {
                              ...lodash.pick(el, [
                                'payableAmount',
                                'incidentId',
                                'id',
                                'claimPayableId',
                              ]),
                              ...lodash.pick(incidentListMapValue?.[id], ['incidentNo']),
                              isUpdate: true,
                            },
                          };
                        },
                        {}
                      ),
                    }
                  : data;
              }, {})
              .value();

            const childId = uuidv4();

            return {
              ...incidentItem,
              [listMapId]: !lodash.isEmpty(lifePayable)
                ? {
                    ...lifePayable,
                  }
                : {
                    id: listMapId,
                    payableAmount: '',
                    payableDays: '',
                    isAdd: true,
                    childrenMap: {
                      [childId]: {
                        id: childId,
                        ...newPayableItem,
                        incidentId: id,
                        ...lodash.pick(incidentListMapValue?.[id], ['incidentNo']),
                      },
                    },
                  },
            };
          }, {})
          .value();
      };

      // MIC类型操作
      const getBaseMajorIllnessCashItem = () => {
        const incidentListMapValue = formUtils.cleanValidateData(incidentListMap);
        const claimIncidentPayableListMapValue = formUtils.cleanValidateData(
          claimIncidentPayableListMap
        );

        return lodash
          .chain(incidentListMapValue)
          .filter((item) => item.id === incidentId)
          .values()
          .reduce((incidentItem: object, { id }: any) => {
            const childId = uuidv4();
            const listMapId = uuidv4();

            const claimIncidentPayable = lodash
              .chain(claimIncidentPayableListMapValue)
              .values()
              .reduce((data, payableItem: any) => {
                if (payableItem.incidentId === id) {
                  const listClaimIncidentPayable = lodash
                    .chain(claimIncidentPayableListMapValue)
                    .values()
                    .filter({
                      incidentId,
                      policyNo,
                      benefitTypeCode,
                      benefitItemCode,
                    })
                    .value();

                  return !lodash.isEmpty(listClaimIncidentPayable)
                    ? {
                        id: listMapId,
                        isUpdate: true,
                        childrenMap: lodash.reduce(
                          listClaimIncidentPayable,
                          (obj: any, el: any) => {
                            return {
                              ...obj,
                              [el.id]: {
                                ...lodash.pick(el, [
                                  'payableAmount',
                                  'incidentId',
                                  'id',
                                  'claimPayableId',
                                ]),
                                ...lodash.pick(incidentListMapValue?.[id], ['incidentNo']),
                                isUpdate: true,
                                claimIncidentPayableId: el.id,
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

            return {
              ...incidentItem,
              [listMapId]: !lodash.isEmpty(claimIncidentPayable)
                ? {
                    ...claimIncidentPayable,
                  }
                : {
                    id: listMapId,
                    payableAmount: '',
                    payableDays: '',
                    isAdd: true,
                    childrenMap: {
                      [childId]: {
                        id: childId,
                        ...newPayableItem,
                        incidentId: id,
                        ...lodash.pick(incidentListMapValue?.[id], ['incidentNo']),
                      },
                    },
                  },
            };
          }, {})
          .value();
      };

      const mapBenefit = {
        [eBenefitCategory.MIC]: () => {
          const res = getBaseMajorIllnessCashItem();
          return res;
        },
        [eBenefitCategory.Life]: () => {
          const res = getBaseLifeItem();
          return res;
        },
        [eBenefitCategory.Reimbursement]: () => {
          const { isStandaloneBooster } = newPolicyItem;

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
                  id: serviceItem?.id || uuidv4(),
                  isUpdate: true,
                  serviceItem: serviceItemTemp.serviceItem,
                  serviceItemId: serviceItemTemp.serviceItemId,
                  isStandaloneBooster,
                  childrenMap: lodash.reduce(
                    listServicePayable,
                    (obj: any, el: any) => {
                      return {
                        ...obj,
                        [el.id]: {
                          ...serviceItemTemp,
                          ...lodash.pick(el, ['payableAmount', 'payableDays']),

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
                        'servicePayableId',
                        'treatmentPayableId',
                        'accidentBenefitPayableId',
                        'incidentId',
                        'treatmentId',
                      ]),
                      id: childId,
                      serviceItemId: serviceItem.id,
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
          if (newPolicyItem?.benefitSubCategory === BenefitSubCategory.OP) {
            const res = getOPPayableItem({ treatmentType: newPolicyItem?.benefitSubCategory });
            return res;
          }
          return {
            ...getBasePayableItem({
              PayableListMap: formUtils.cleanValidateData(treatmentPayableListMap),
              treatmentType: newPolicyItem?.benefitSubCategory,
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
        [eBenefitCategory.T]: () => {
          return {
            ...getBenefitCategoryIsCIPayableItem(),
          };
        },
        [eBenefitCategory.CIC]: () => {
          return {
            ...getBenefitCategoryIsCIPayableItem(),
          };
        },
      };

      if (lodash.isFunction(mapBenefit[newPolicyItem?.benefitCategory])) {
        const benefitItem = mapBenefit[newPolicyItem?.benefitCategory]();

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
