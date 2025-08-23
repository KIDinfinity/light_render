import lodash from 'lodash';
import { produce }  from 'immer';

export default function* resetStepSecondData(_: any, { put, select }: any) {
  const businessData = yield select((state: any) => state.manualUnderwriting.businessData);
  const originBizData = yield select((state: any) => state.manualUnderwriting?.originBizData);
  const stepsChange = yield select((state: any) => state.manualUnderwriting);
  const dataSourcePaths = [
    'policyList[0].coverageList',
    'policyList[0].policyPlanType',
    'policyList[0].policyPlanName',
    'businessData.customerSubmitDate',
    'policyList[0].policyPayMode',
    'policyList[0].refundPayType',
    'policyList[0].renewalPayType',
    'policyList[0].isBack',
    'policyList[0].effectiveDate',
    'policyList[0].rspCharge',
    'policyList[0].campaignCode',
    'policyList[0].policyReplacementFlag',
    'policyList[0].replacementInfoList',
  ];
  const newData = produce(businessData, (draftData: any) => {
    lodash.forEach(dataSourcePaths, (path: string) => {
      lodash.set(draftData, path, lodash.get(originBizData, path));
    });
  });

  yield put({
    type: 'saveBizData',
    payload: {
      businessData: newData,
    },
  });
  yield put({
    type: 'setStepChange',
    payload: {
      stepsChange: {
        ...stepsChange,
        PlanInfo: false,
      },
    },
  });
}
