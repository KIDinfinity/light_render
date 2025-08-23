import lodash from 'lodash';
import { SwitchEnum } from 'claim/pages/utils/claim';

const packFactorList = (state: any, action: any) => {
  const listPolicy = state?.listPolicy || [];
  const incidentList = state?.claimProcessData?.incidentList || [];
  const claimAdjustmentFactorList = state?.claimProcessData?.claimAdjustmentFactorList || [];
  const listBenefitFactor = state?.listBenefitFactor || [];

  const uniqByPolicyProduct = lodash
    .chain(listPolicy)
    .uniqBy((item: any) => `${item?.policyNo}${item?.coreProductCode}`)
    .map((item: any) => ({ policyNo: item?.policyNo, productCode: item?.coreProductCode }))
    .orderBy(['policyNo', 'productCode'])
    .value();
  const uniqByProductFactor = lodash
    .chain(listBenefitFactor)
    .uniqBy((item: any) => `${item?.benefitTypeCode}${item?.factorCode}`)
    .map((item: any) => ({
      benefitTypeCode: item?.benefitTypeCode,
      productCode: item?.productCode,
      factorCode: item?.factorCode,
      factorValueType: item?.factorValueType,
      radioGroup: item?.radioGroup,
      parentFactorCode: item?.parentFactorCode,
      displayByPolicyYear: item.displayByPolicyYear,
      viewOrder: item.viewOrder,
    }))
    .orderBy('viewOrder')
    .value();

  const setp1 = lodash.map(uniqByPolicyProduct, (item: any) => {
    const factorList = lodash
      .chain(uniqByProductFactor)
      .filter(
        (filter: any) =>
          (filter?.productCode === item?.productCode && !lodash.isNil(item?.productCode)) ||
          // 0代表所有产品都需要显示
          filter?.productCode === '0'
      )
      .value();
    return {
      ...item,
      factorList,
    };
  });

  const setp2 = lodash
    .chain(incidentList)
    .map((item: any) => lodash.map(setp1, (self: any) => ({ ...self, incidentId: item })))
    .flatten()
    .value();

  const result = lodash.reduce(
    setp2,
    (itemResult: any, item: any) => {
      return {
        ...itemResult,
        [`${item?.policyNo}${item?.productCode}${item?.incidentId}`]: {
          ...item,
          factorList: lodash
            .chain(item?.factorList)
            .reduce((selfResult, self: any) => {
              const factorTargeList = lodash.filter(claimAdjustmentFactorList, {
                policyNo: item?.policyNo,
                productCode: item?.productCode,
                incidentId: item?.incidentId,
                factorCode: self?.factorCode,
              });

              return {
                ...selfResult,
                [self?.factorCode]: {
                  ...self,
                  isSelected: factorTargeList[0]?.isSelected,
                  list:
                    self.displayByPolicyYear === SwitchEnum.YES
                      ? lodash
                          .chain(factorTargeList)
                          .reduce((factorArr: any, el: any) => {
                            if (
                              !lodash.find(
                                factorArr,
                                (item: any) => item.policyYear === el.policyYear
                              )
                            ) {
                              return [
                                ...factorArr,
                                {
                                  ...self,
                                  ...lodash.pick(el, [
                                    'productPlan',
                                    'factorValue',
                                    'policyYear',
                                    'isSelected',
                                  ]),
                                },
                              ];
                            }
                            return factorArr;
                          }, [])
                          .orderBy('policyYear')
                          .value()
                      : [
                          {
                            ...self,
                            ...lodash.pick(factorTargeList[0], [
                              'productPlan',
                              'factorValue',
                              'policyYear',
                              'isSelected',
                            ]),
                          },
                        ],
                },
              };
            }, {})
            .value(),
        },
      };
    },
    {}
  );
  return {
    ...state,
    adjustmentFactorListMap: result,
  };
};

export default packFactorList;
