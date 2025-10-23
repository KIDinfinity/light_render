import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add, multiply, divide, subtract } from '@/utils/precisionUtils';
import type { PolicyBenefitModal, BeneficiaryModal } from '../dto';

const parseNum = (num: number) => parseFloat(num.toFixed(2));
const onLink = (config: any) => {
  lodash.map(config, (item) => {
    if (lodash.size(item.changedFields) === 1 && lodash.has(item.changedFields, item.fieldName)) {
      if (lodash.isFunction(item.callback)) item.callback();
    }
  });
};

const calculateBeneficiaryAmount = ({ beneficiaryList, benefitAmount }: any) => {
  const percentageSum = lodash.reduce(
    beneficiaryList,
    (result: number, beneficiary: any) => {
      return add(result, formUtils.queryValue(beneficiary.beneficiaryPercentage));
    },
    0
  );
  if (percentageSum <= 100) {
    const temp = beneficiaryList.map((item: any) => {
      return {
        ...item,
        beneficiaryAmount: parseNum(
          multiply(
            formUtils.queryValue(benefitAmount),
            divide(formUtils.queryValue(item.beneficiaryPercentage), 100)
          )
        ),
        benefitAmount: benefitAmount,
        payoutAmount: parseNum(
          multiply(
            formUtils.queryValue(benefitAmount),
            divide(formUtils.queryValue(item.beneficiaryPercentage), 100)
          )
        ),
      };
    });

    if (percentageSum === 100) {
      const lastBeneficiary: any = lodash.last(temp);
      lastBeneficiary.beneficiaryAmount = temp
        .slice(0, -1)
        .reduce((sum: number, item: any) => subtract(sum, item.beneficiaryAmount), benefitAmount);
      lastBeneficiary.payoutAmount = lastBeneficiary.beneficiaryAmount;
    }
    return temp;
  }

  return beneficiaryList;
};

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { changedFields, id: beneficiaryId, policyBenefitId: benefitId } = payload;

    const { datas } = draft.paymentModal;
    const { policyBenefitList, beneficiaryList } = datas;
    if (benefitId) {
      if(lodash.has(changedFields, 'policyNo') && lodash.size(changedFields) === 1) {
        // 切换policy的功能被禁用，因此这里暂时先不加isManual逻辑
        const policyBenefit = policyBenefitList.find(item => item.id === benefitId);
        const beneficiary = policyBenefit.beneficiaryList.find(item => item.id === beneficiaryId);
        policyBenefit.beneficiaryList = policyBenefit.beneficiaryList.filter(item => item.id !== beneficiaryId);

        const policyNo = formUtils.queryValue(changedFields.policyNo);
        const nextPolicyBenefit = policyBenefitList.find(item => item.policyNo === policyNo);
        if(nextPolicyBenefit) {
          nextPolicyBenefit.beneficiaryList = [...nextPolicyBenefit.beneficiaryList || [], { ...beneficiary, ...changedFields }]
        } else {
          policyBenefitList.push({
            policyNo,
            beneficiaryList: [{ ...beneficiary, ...changedFields }]
          })
        }
        return draftState;
      }

      const tempPolicyBenefitList: any[] = lodash
        .chain(policyBenefitList)
        .compact()
        .map((policyBenefit: PolicyBenefitModal) => {
          let policyBenefitTemp = { ...policyBenefit };
          const { beneficiaryList, id } = policyBenefitTemp;

          if (id === benefitId) {
            let beneficiaries = lodash
              .chain(beneficiaryList)
              .compact()
              .map((beneficiaryItem: BeneficiaryModal) => {
                if (beneficiaryItem.id === beneficiaryId) {
                  return { ...beneficiaryItem, ...changedFields };
                }

                return beneficiaryItem;
              })
              .value();

            onLink([
              {
                changedFields,
                fieldName: 'beneficiaryPercentage',
                callback: () => {
                  beneficiaries = calculateBeneficiaryAmount({
                    beneficiaryList: beneficiaries,
                    benefitAmount: policyBenefitTemp.benefitAmount,
                  });
                },
              },
              {
                changedFields,
                fieldName: 'payTo',
                callback: () => {
                  beneficiaries = beneficiaries.map(item => {
                    if(item.id !== beneficiaryId)
                      return item;
                    return lodash.pick(item, ['beneficiaryPercentage', 'beneficiaryAmount', 'payTo', 'policyNo', 'claimNo', 'policyBenefitId', 'id'])
                  })
                },
              },
              {
                changedFields,
                fieldName: 'payeeId',
                callback: () => {
                  beneficiaries = beneficiaries.map(item => {
                    if(item.id !== beneficiaryId)
                      return item;
                    const payeeInfo = draft.paymentModal.datas.payeeList.find(payee => payee.id === formUtils.queryValue(changedFields.payeeId));
                    
                    const basicData = lodash.pick(item, ['beneficiaryPercentage', 'beneficiaryAmount', 'payTo', 'policyNo', 'claimNo', 'policyBenefitId', 'id']);
                    return {
                      ...basicData,
                      ...lodash.omit(payeeInfo, ['id', 'creator', 'gmtCreate', 'gmtModified', 'payeeContactList', 'payeeBankAccountList']),
                      ...changedFields,
                      isManual: 'Y'
                    }
                  })
                }
              }
            ]);
            policyBenefitTemp = { ...policyBenefitTemp, beneficiaryList: beneficiaries, isManual: 'Y' };
          }
          return policyBenefitTemp;
        })
        .value();

      draft.paymentModal.datas.policyBenefitList = tempPolicyBenefitList;
    } else {
      let tempBeneficiaryList: any[] = lodash
        .chain(beneficiaryList)
        .compact()
        .map((beneficiaryItem: BeneficiaryModal) => {
          if (beneficiaryItem.id === beneficiaryId) {
            return { ...beneficiaryItem, ...changedFields };
          }

          return beneficiaryItem;
        })
        .value();

      onLink([
        {
          changedFields,
          fieldName: 'policyNo',
          callback: () => {
            const beneficiaryItem = lodash.find(tempBeneficiaryList, { id: beneficiaryId });
            beneficiaryItem.beneficiaryPercentage = 100;
            const tempPolicyBenefitList = lodash.map(policyBenefitList, (item) => {
              if (item.policyNo === formUtils.queryValue(changedFields?.policyNo)) {
                const temp = [...item.beneficiaryList, beneficiaryItem];

                item.beneficiaryList = calculateBeneficiaryAmount({
                  beneficiaryList: temp,
                  benefitAmount: item.benefitAmount,
                });
                return {
                  ...item,
                  isManual: 'Y'
                };
              }
              return item;
            });

            draft.paymentModal.datas.policyBenefitList = tempPolicyBenefitList;
            tempBeneficiaryList = lodash.filter(
              tempBeneficiaryList,
              (item) => item.id !== beneficiaryId
            );
          },
        },
        {
          changedFields,
          fieldName: 'payTo',
          callback: () => {
            tempBeneficiaryList = tempBeneficiaryList.map(item => {
              if(item.id !== beneficiaryId)
                return item;
              return lodash.pick(item, ['beneficiaryPercentage', 'beneficiaryAmount', 'payTo', 'policyNo', 'claimNo', 'policyBenefitId', 'id'])
            })
          },
        },
        {
          changedFields,
          fieldName: 'payeeId',
          callback: () => {
            tempBeneficiaryList = tempBeneficiaryList.map(item => {
              if(item.id !== beneficiaryId)
                return item;
              const payeeInfo = draft.paymentModal.datas.payeeList.find(payee => payee.id === formUtils.queryValue(changedFields.payeeId));
              
              const basicData = lodash.pick(item, ['beneficiaryPercentage', 'beneficiaryAmount', 'payTo', 'policyNo', 'claimNo', 'policyBenefitId', 'id'])
              return {
                ...basicData,
                ...lodash.omit(payeeInfo, ['id', 'creator', 'gmtCreate', 'gmtModified', 'payeeContactList', 'payeeBankAccountList']),
                ...changedFields,
                isManual: 'Y'
              }
            })
          }
        }
      ]);

      draft.paymentModal.datas.beneficiaryList = tempBeneficiaryList;
    }
  });
};
