import { produce }  from 'immer';
import lodash from 'lodash';

const saveLifeJRefundInfo = (state: any, { payload }: any) => {
  const {
    id,
    incidentId,
    ...refundInfo
  } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.incidentListMap[incidentId].klipCaseInfoList = lodash
      .chain(draftState.claimEntities?.incidentListMap?.[incidentId]?.klipCaseInfoList || [])
      .map((item: any) =>{
        return item.id === id? {
          ...item,
          ...lodash.pick(refundInfo, [
            'lifejRefundEntryAmount',
            'lifejRefundMaterialFee',
            'lifejRefundPaidPremAmt',
            'lifejRefundPayoutAmount',
            'lifejRefundUnpaidPremAmt',
            'lifejRefundInterestIncome',
          ]),
        } : item
      })
      .value()
  });
  return { ...nextState };
};
export default saveLifeJRefundInfo;
