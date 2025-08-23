/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any) =>
  produce(state, (draftState: any) => {
    draftState.processData.policyInfo = lodash.omit(draftState.processData.policyInfo, [
      'applyToPolicyInfoList',
      'clientContact',
      'mainInsuredClientId',
      'mainOwnerClientId',
      'policyAddress',
      'sourceSystem',
    ]);

    draftState.processData = lodash.omit(draftState.processData, [
      'policyInfo',
      'mainInsuredClientId',
      'mainOwnerClientId',
      'sourceSystem',
    ]);

    draftState.processData.transactionTypes = [];

    draftState.entities = {};
  });
