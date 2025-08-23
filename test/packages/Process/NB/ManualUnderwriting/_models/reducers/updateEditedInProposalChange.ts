import lodash from 'lodash';
import { diff } from 'json-diff';
import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { diffSource, originBizData } = state;
  const SpecialDataPath = [
    'annualIncomeInLocalCurrency',
    'crtInfoList[1].id',
    'crtInfoList[1].type',
    'customerAge',
    'customerType',
  ];
  const nextState = produce(state, (draftState: any) => {
    const changeMap = new Map();
    lodash
      .chain(diffSource)
      .get('clientInfoList')
      .entries()
      .forEach(([clientInfoId, clientInfoItem]) => {
        const originClientInfoList = lodash.get(originBizData, 'policyList[0].clientInfoList');
        const index = lodash.findIndex(
          originClientInfoList,
          (item: any) => item.id === clientInfoId
        );
        let editedInProposalChange = 'N';
        lodash
          .chain(clientInfoItem)
          .entries()
          .forEach(([key, value]) => {
            if (!SpecialDataPath.includes(key)) {
              const targetData = lodash.get(
                originBizData,
                `policyList[0].clientInfoList[${index}].${key}`
              );
              const isDiff = diff(lodash.cloneDeep(targetData), lodash.cloneDeep(value));
              if (isDiff) {
                editedInProposalChange = 'Y';
                changeMap.set(clientInfoId, editedInProposalChange);
                return;
              }
            }
          })
          .value();
      })
      .value();
    const clientInfoList = lodash
      .chain(draftState)
      .get('businessData.policyList[0].clientInfoList', [])
      .map((clientItem: any) => {
        return {
          ...clientItem,
          editedInProposalChange: changeMap.get(clientItem.id) || 'N',
        };
      })
      .value();
    lodash.set(draftState, `businessData.policyList[0].clientInfoList`, clientInfoList);
  });

  return nextState;
};
