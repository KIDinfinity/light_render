import { produce } from 'immer';
import lodash from 'lodash';

const updateBusinessData = (draftState: any, businessData: any) => {
  lodash.set(
    draftState,
    'processData.planInfoData.isBack',
    lodash.get(businessData, 'policyList[0].isBack', '')
  );
  lodash.set(
    draftState,
    'processData.planInfoData.effectiveDate',
    lodash.get(businessData, 'policyList[0].effectiveDate', '')
  );

  lodash.set(draftState, 'needPremRecal', lodash.get(businessData, 'needPremRecal', ''));
  const clientList = lodash.get(businessData, 'policyList[0].clientInfoList', []);

  const updateClient = lodash.reduce(
    clientList,
    (acc: any, client: any) => {
      const id = client.id;
      if (draftState.entities?.clientMap[id]) {
        const personalInfo = {
          ...(draftState.entities?.clientMap?.[id]?.personalInfo || {}),
          customerAge: client.customerAge || '',
          alertId: client.alertId || '',
          crrAlertId: client.crrAlertId || '',
        };
        return {
          ...acc,
          [id]: {
            ...(draftState.entities?.clientMap[id] || {}),
            personalInfo,
          },
        };
      }
      return acc;
    },
    {}
  );

  draftState.entities.clientMap = { ...draftState.entities?.clientMap, ...updateClient };
};

const updateDecisionDate = (draftState: any, businessData: any) => {
  const decisionDate = lodash.get(businessData, 'policyList[0].policyDecision.decisionDate', null);
  if (decisionDate) {
    draftState.processData.policyDecision.decisionDate = decisionDate;
  }
};

export default (state: any, action: any) => {
  const businessData = lodash.get(action, 'payload.businessData', {});
  const updateType = action?.payload?.updateType;

  const nextState = produce(state, (draftState: any) => {
    if (updateType === 'updateDecisionDate') {
      updateDecisionDate(draftState, businessData);
    } else {
      updateBusinessData(draftState, businessData);
    }
  });
  return {
    ...nextState,
  };
};
