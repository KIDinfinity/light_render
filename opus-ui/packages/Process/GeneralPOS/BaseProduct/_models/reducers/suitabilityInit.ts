/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import moment from 'moment';
export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, clientSuitabilityProfileList } = payload;
    const initData = clientSuitabilityProfileList?.[0] || {};
    console.log('initData', initData);
    if (lodash.isEmpty(draftState.entities.transactionTypesMap?.[transactionId]?.suitability)) {
      draftState.entities.transactionTypesMap[transactionId].suitability = {};
    }
    if (lodash.isEmpty(draftState.entities.transactionTypesMap?.[transactionId]?.suitability)) {
      draftState.entities.transactionTypesMap[transactionId].suitability = {
        ...initData,
        validSuitability: 'N',
        suitabilityDate: moment(initData?.suitabilityDate).format(),
        riskToleranceLevel: initData?.customerRiskLevel,
      };
    }
    if (
      !draftState.entities.transactionTypesMap?.[transactionId]?.suitability?.editFlag &&
      !lodash.isEmpty(initData)
    ) {
      draftState.entities.transactionTypesMap[transactionId].suitability = {
        ...(draftState.entities.transactionTypesMap[transactionId].suitability || {}),
        ...initData,
        suitabilityDate: moment(initData?.suitabilityDate).format(),
        riskToleranceLevel: initData?.customerRiskLevel,
      };
    }
  });
