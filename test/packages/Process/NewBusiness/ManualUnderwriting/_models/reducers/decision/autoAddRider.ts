import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { formUtils } from 'basic/components/Form';
import { linkCoreCode } from './setDecisionFieldData';

const COVERAGEITEM = {
  productName: '',
  currencyCode: '',
  upToAge: null,
  discountCode: '',
  discount: null,
};

export default (state: any, action: any) => {
  const { coreCode, id: coverageId } = lodash.pick(action.payload, ['coreCode', 'id']);
  const planProductConfig = lodash.get(state, 'planProductConfig');
  const { applicationNo, policyId }: any = lodash.pick(state.processData?.planInfoData, [
    'policyId',
    'applicationNo',
  ]);
  const coverageList = lodash.get(state, 'modalData.processData.coverageList');
  const isMain = lodash.find(coverageList, { id: coverageId })?.isMain === 'Y';
  const dataSource = isMain ? 'basicPlanProductFeatureList' : 'otherPlanProductFeatureList';
  const nextCoreCodeList = lodash
    .filter(coverageList, (item: any) => item.id !== coverageId)
    .map((item: any) => formUtils.queryValue(item.coreCode))
    .concat(coreCode);
  const requiredRiderList = lodash
    .chain(planProductConfig?.[dataSource])
    .find({ productCode: coreCode })
    .get('requiredRiderCodeList')
    .filter((riderCoreCode: any) => !lodash.includes(nextCoreCodeList, riderCoreCode))
    .value();
  const converageNum = lodash.size(coverageList);

  const newRiderList = lodash.map(requiredRiderList, (itemCoreCode: any, index: number) => {
    const id = uuidv4();
    const extraFields = {};
    linkCoreCode({ coreCode: itemCoreCode, extraFields, planProductConfig, isMain, coverageList });
    return {
      ...COVERAGEITEM,
      id,
      applicationNo,
      policyId,
      coreCode: itemCoreCode,
      isMain: converageNum === 0 ? 'Y' : 'N',
      coverageNum: converageNum + 1 + index,
      coverageInsuredList: [
        {
          id: uuidv4(),
          insuredSeqNum: '',
        },
      ],
      coverageBenefitsList:
        converageNum === 0
          ? [
              {
                policyId,
                applicationNo,
                coverageId: id,
              },
            ]
          : [],
      ...extraFields,
    };
  });
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'modalData.processData.coverageList', [
      ...coverageList,
      ...newRiderList,
    ]);
  });

  return { ...nextState };
};
