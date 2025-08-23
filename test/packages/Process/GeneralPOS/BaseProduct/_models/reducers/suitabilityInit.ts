/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import moment from 'moment';
export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, clientSuitabilityProfileList } = payload;
    const initData = clientSuitabilityProfileList?.[0] || {};

    if (lodash.isEmpty(draftState.entities.transactionTypesMap?.[transactionId]?.suitability)) {
      draftState.entities.transactionTypesMap[transactionId].suitability = {};
    }
    if (lodash.isEmpty(draftState.entities.transactionTypesMap?.[transactionId]?.suitability)) {
      draftState.entities.transactionTypesMap[transactionId].suitability = {
        ...initData,
        validSuitability: 'N',
        riskToleranceLevel: initData?.customerRiskLevel,
      };
      if (
        !lodash.isNumber(initData?.suitabilityDate) &&
        !lodash.isEmpty(initData?.suitabilityDate)
      ) {
        draftState.entities.transactionTypesMap[transactionId].suitability = {
          ...draftState.entities.transactionTypesMap[transactionId].suitability,
          suitabilityDate: moment(initData?.suitabilityDate).format(),
        };
      }
    }
    if (
      !draftState.entities.transactionTypesMap?.[transactionId]?.suitability?.editFlag &&
      !lodash.isEmpty(initData)
    ) {
      draftState.entities.transactionTypesMap[transactionId].suitability = {
        ...(draftState.entities.transactionTypesMap[transactionId].suitability || {}),
        ...initData,
        riskToleranceLevel: initData?.customerRiskLevel,
      };
      if (
        !lodash.isNumber(initData?.suitabilityDate) &&
        !lodash.isEmpty(initData?.suitabilityDate)
      ) {
        draftState.entities.transactionTypesMap[transactionId].suitability = {
          ...draftState.entities.transactionTypesMap[transactionId].suitability,
          suitabilityDate: moment(initData?.suitabilityDate).format(),
        };
      }
    }
  });
