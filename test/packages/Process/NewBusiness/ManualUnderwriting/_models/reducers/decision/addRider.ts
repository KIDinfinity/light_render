import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export default (state: any, action: any) => {
  const {
    applicationNo,
    policyId,
    coreCode = '',
    sumAssured = '',
    indemnifyPeriod = '',
    payPeriod = '',
    indemnifyPeriodUnit = '',
    payPeriodUnit = '',
  } = lodash.pick(action.payload, [
    'policyId',
    'coreCode',
    'coverageNum',
    'applicationNo',
    'sumAssured',
    'indemnifyPeriod',
    'payPeriod',
    'indemnifyPeriodUnit',
    'payPeriodUnit',
  ]);
  const id = uuidv4();
  let ownCoverageList = lodash.get(state, 'modalData.processData.coverageList') || [];
  ownCoverageList = lodash.castArray(ownCoverageList);

  const newRow = {
    applicationNo,
    policyId,
    productName: '',
    currencyCode: '',
    sumAssured,
    upToAge: null,
    indemnifyPeriod,
    payPeriod,
    indemnifyPeriodUnit,
    payPeriodUnit,
    discountCode: '',
    discount: null,
    id,
    isMain: lodash.size(ownCoverageList) === 0 ? 'Y' : 'N',
    coreCode,
    coverageNum: lodash.size(ownCoverageList) + 1,
    coverageInsuredList: [
      {
        id: uuidv4(),
        insuredSeqNum: '',
      },
    ],
    coverageBenefitsList:
      lodash.size(ownCoverageList) === 0
        ? [
            {
              policyId,
              applicationNo,
              coverageId: id,
            },
          ]
        : [],
  };
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'modalData.processData.coverageList', [...ownCoverageList, newRow]);
  });

  return { ...nextState };
};
