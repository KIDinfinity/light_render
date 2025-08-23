import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { BenefitCategory } from 'claim/pages/utils/claim';
import handleBenefitTypeCode from './handleBenefitTypeCode';
import clearClaimPayableItem from './clearClaimPayableItem';

const findPolicyBenefits = (policyList: any[], payable: any) => {
  const cleanPayable = formUtils.cleanValidateData(payable);
  return lodash
    .chain(policyList)
    .compact()
    .filter(
      (policyItem: any) =>
        policyItem.policyNo === cleanPayable?.policyNo &&
        policyItem.coreProductCode === cleanPayable?.productCode &&
        policyItem.benefitTypeCode === cleanPayable?.benefitTypeCode
    )
    .uniqBy('benefitItemCode')
    .value();
};

const isSameProduct = (subPayable: any, claimPayable: any) => {
  const { policyNo, productCode, benefitTypeCode } = formUtils.cleanValidateData(claimPayable);
  return (
    formUtils.queryValue(subPayable.policyNo) === policyNo &&
    formUtils.queryValue(subPayable.productCode) === productCode &&
    formUtils.queryValue(subPayable.benefitTypeCode) === benefitTypeCode
  );
};

const setDefPolicyProduct = (state: any, param: any) => {
  const { changedFields, claimPayable } = param;
  let claimPayableTemp = lodash.cloneDeep(claimPayable);
  const keys = lodash.keys(changedFields);
  const key = keys[0];
  const val = formUtils.queryValue(changedFields[key]);
  const monitorKeys = ['policyNo', 'productCode', 'benefitTypeCode'];

  if (keys.length !== 1 || !monitorKeys.includes(key) || !val) {
    return { claimPayable, claimEntities: state.claimEntities };
  }

  const { policyNo, incidentId, id: payableId } = formUtils.cleanValidateData(claimPayableTemp);

  const produced: any = produce(state, (draft: any) => {
    const draftState = draft;
    const { listPolicy, claimEntities } = draftState;

    // const policyList = lodash.uniqBy(listPolicy, 'policyNo');
    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyNo ? policyGrouped[policyNo] : [];

    const productList = lodash.uniqBy(filteredList, 'coreProductCode');

    if (lodash.size(productList) === 1 && !formUtils.queryValue(claimPayableTemp.productCode)) {
      const productItem: any = lodash.head(productList);
      lodash.set(claimPayableTemp, 'productCode', productItem?.coreProductCode);

      claimPayableTemp.benefitTypeCode = '';
      claimPayableTemp.benefitCategory = '';
      claimPayableTemp.lifePayable = null;
      clearClaimPayableItem(claimPayableTemp, claimEntities);
    }

    const productGrouped = lodash.groupBy(productList, 'coreProductCode');
    const productFilteredList = formUtils.queryValue(claimPayableTemp.productCode)
      ? productGrouped[formUtils.queryValue(claimPayableTemp.productCode)]
      : [];
    const benefitTypeList = lodash.uniqBy(productFilteredList, 'benefitTypeCode');

    if (
      lodash.size(benefitTypeList) === 1 &&
      !formUtils.queryValue(claimPayableTemp.benefitTypeCode)
    ) {
      const benefitTypeItem: any = lodash.head(benefitTypeList);
      lodash.set(claimPayableTemp, 'benefitTypeCode', benefitTypeItem?.benefitTypeCode);

      claimPayableTemp.benefitCategory = '';
      claimPayableTemp.lifePayable = null;
      const result = handleBenefitTypeCode(claimPayableTemp, claimEntities, listPolicy);
      claimPayableTemp = result.editClaimPayableListItem;
      draftState.claimEntities = result.editClaimEntities;
    }

    const benefitItemHandler = {
      [BenefitCategory.life]: () => {
        const benefitItemList = findPolicyBenefits(listPolicy, claimPayableTemp);
        const benefitItem: any = lodash.head(benefitItemList);
        if (
          lodash.size(benefitItemList) === 1 &&
          !formUtils.queryValue(claimPayableTemp.benefitItemCode)
        ) {
          lodash.set(claimPayableTemp, 'benefitItemCode', benefitItem?.benefitItemCode);
        }
      },
      [BenefitCategory.aipa]: ({ treatmentPayableList }: any) => {
        lodash.forEach(treatmentPayableList, (treatmentPayableId: string) => {
          const treatmentPayableItem =
            draftState.claimEntities.treatmentPayableListMap[treatmentPayableId];
          if (
            treatmentPayableItem &&
            treatmentPayableItem.incidentId === incidentId &&
            treatmentPayableItem.payableId === payableId &&
            isSameProduct(treatmentPayableItem, claimPayableTemp)
          ) {
            const treatmentPayable = { ...treatmentPayableItem };
            const { accidentBenefitPayableList } = treatmentPayable;

            const benefitItemList = findPolicyBenefits(listPolicy, treatmentPayable);
            const benefitItem: any = lodash.head(benefitItemList);
            if (lodash.size(benefitItemList) === 1) {
              lodash.forEach(accidentBenefitPayableList, (accidentBenefitPayableId: string) => {
                const accidentBenefitPayableItem =
                  draftState.claimEntities.accidentBenefitPayableListMap[accidentBenefitPayableId];
                if (
                  accidentBenefitPayableItem &&
                  accidentBenefitPayableItem.incidentId === incidentId &&
                  accidentBenefitPayableItem.payableId === payableId &&
                  accidentBenefitPayableItem.treatmentPayableId === treatmentPayableId &&
                  isSameProduct(accidentBenefitPayableItem, claimPayableTemp) &&
                  !formUtils.queryValue(accidentBenefitPayableItem.benefitItemCode)
                ) {
                  lodash.set(
                    accidentBenefitPayableItem,
                    'benefitItemCode',
                    benefitItem?.benefitItemCode
                  );
                }
              });
            }
          }
        });
      },
      [BenefitCategory.cashless]: ({ treatmentPayableList }: any) => {
        lodash.forEach(treatmentPayableList, (treatmentPayableId: string) => {
          const treatmentPayableItem =
            draftState.claimEntities.treatmentPayableListMap[treatmentPayableId];

          if (
            treatmentPayableItem &&
            treatmentPayableItem.incidentId === incidentId &&
            treatmentPayableItem.payableId === payableId &&
            isSameProduct(treatmentPayableItem, claimPayableTemp)
          ) {
            const treatmentPayable = { ...treatmentPayableItem };

            const benefitItemList = findPolicyBenefits(listPolicy, treatmentPayable);
            const benefitItem: any = lodash.head(benefitItemList);

            if (
              lodash.size(benefitItemList) === 1 &&
              !formUtils.queryValue(treatmentPayableItem.benefitItemCode)
            ) {
              lodash.set(treatmentPayableItem, 'benefitItemCode', benefitItem?.benefitItemCode);
            }
          }
        });
      },
      [BenefitCategory.reimbursement]: ({ treatmentPayableList }: any) => {
        lodash.forEach(treatmentPayableList, (treatmentPayableId: string) => {
          const treatmentPayableItem =
            draftState.claimEntities.treatmentPayableListMap[treatmentPayableId];
          if (
            treatmentPayableItem &&
            treatmentPayableItem.incidentId === incidentId &&
            treatmentPayableItem.payableId === payableId &&
            isSameProduct(treatmentPayableItem, claimPayableTemp)
          ) {
            const treatmentPayable = { ...treatmentPayableItem };
            const { invoicePayableList } = treatmentPayable;

            lodash.forEach(invoicePayableList, (invoicePayableId: string) => {
              const invoicePayableItem =
                draftState.claimEntities.invoicePayableListMap[invoicePayableId];
              if (
                invoicePayableItem &&
                invoicePayableItem.incidentId === incidentId &&
                invoicePayableItem.payableId === payableId &&
                invoicePayableItem.treatmentPayableId === treatmentPayableId &&
                isSameProduct(invoicePayableItem, claimPayableTemp)
              ) {
                const invoicePayable = { ...invoicePayableItem };
                const { benefitItemPayableList, serviceItemPayableList } = invoicePayable;

                //处理benefitItemPayable的情况
                lodash.forEach(benefitItemPayableList, (benefitItemPayableId: string) => {
                  const benefitItemPayableItem =
                    draftState.claimEntities.benefitItemPayableListMap[benefitItemPayableId];
                  if (
                    benefitItemPayableItem &&
                    benefitItemPayableItem.incidentId === incidentId &&
                    benefitItemPayableItem.payableId === payableId &&
                    benefitItemPayableItem.treatmentPayableId === treatmentPayableId &&
                    benefitItemPayableItem.invoicePayableId === invoicePayableId &&
                    isSameProduct(benefitItemPayableItem, claimPayableTemp)
                  ) {
                    const benefitItemPayable = { ...benefitItemPayableItem };

                    const benefitItemList = findPolicyBenefits(listPolicy, benefitItemPayable);
                    const benefitItem: any = lodash.head(benefitItemList);
                    if (
                      lodash.size(benefitItemList) === 1 &&
                      !formUtils.queryValue(benefitItemPayableItem.benefitItemCode)
                    ) {
                      lodash.set(
                        benefitItemPayableItem,
                        'benefitItemCode',
                        benefitItem?.benefitItemCode
                      );
                    }
                  }
                });

                //处理servicePayable的情况
                lodash.forEach(serviceItemPayableList, (serviceItemPayableId: string) => {
                  const serviceItemPayableItem =
                    draftState.claimEntities.serviceItemPayableListMap[serviceItemPayableId];
                  if (
                    serviceItemPayableItem &&
                    serviceItemPayableItem.incidentId === incidentId &&
                    serviceItemPayableItem.payableId === payableId &&
                    serviceItemPayableItem.treatmentPayableId === treatmentPayableId &&
                    serviceItemPayableItem.invoicePayableId === invoicePayableId &&
                    isSameProduct(serviceItemPayableItem, claimPayableTemp)
                  ) {
                    const serviceItemPayable = { ...serviceItemPayableItem };

                    const benefitItemList = findPolicyBenefits(listPolicy, serviceItemPayable);
                    const benefitItem: any = lodash.head(benefitItemList);
                    if (
                      lodash.size(benefitItemList) === 1 &&
                      !formUtils.queryValue(serviceItemPayableItem.benefitItemCode)
                    ) {
                      lodash.set(
                        serviceItemPayableItem,
                        'benefitItemCode',
                        benefitItem?.benefitItemCode
                      );
                    }
                  }
                });
              }
            });
          }
        });
      },
    };

    const benefitCategory = formUtils.queryValue(claimPayableTemp.benefitCategory);

    if (benefitCategory && lodash.isFunction(benefitItemHandler[benefitCategory]))
      benefitItemHandler[benefitCategory](claimPayableTemp);

    if (formUtils.queryValue(claimPayableTemp.benefitCategory) === BenefitCategory.life) {
      const target = lodash.cloneDeep(claimPayableTemp);
      delete target.lifePayable;
      claimPayableTemp.lifePayable = {
        ...claimPayableTemp.lifePayable,
        ...target,
        payableId: target.id,
      };
      delete claimPayableTemp.benefitItemCode;
      lodash.set(claimPayableTemp, 'lifePayable.calculationAmount', target?.assessorOverrideAmount);
      lodash.set(claimPayableTemp, 'lifePayable.reimbursementPercentage', 100);
    } else {
      delete claimPayableTemp.lifePayable;
    }

  });

  return {
    claimPayable: claimPayableTemp,
    claimEntities: produced.claimEntities,
  };
};

export default setDefPolicyProduct;
