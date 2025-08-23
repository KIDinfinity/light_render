import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const changedFields = lodash.get(action?.payload, ['changedFields']);
  const id = lodash.get(action?.payload, ['id']);
  const nextState = produce(state, (draftState: any) => {
    const index = lodash
      .chain(draftState)
      .get('businessData.agentList', [])
      .findIndex((agent: any) => agent.id === id)
      .value();

    lodash.set(draftState, 'stepsChange.OtherInfo', true);
    if (index !== -1) {
      if (lodash.has(changedFields, 'crossSelling')) {
        lodash.set(
          draftState,
          `businessData.agentList[${index}].crossSelling`,
          lodash.join(formUtils.queryValue(changedFields.crossSelling), ',')
        );
      } else if (lodash.has(changedFields, 'bankStaffNo')) {
        const bankStaffRefName = lodash
          .chain(draftState)
          .get('uwProposalAgent.bankList')
          .find((item) => item.bankStaffNo === formUtils.queryValue(changedFields.bankStaffNo))
          .get('bankStaffRefName')
          .value();
        lodash.set(draftState, `businessData.agentList[${index}]`, {
          ...lodash.get(draftState, `businessData.agentList[${index}]`, {}),
          ...changedFields,
          bankStaffRefName,
        });
      } else {
        lodash.set(draftState, `businessData.agentList[${index}]`, {
          ...lodash.get(draftState, `businessData.agentList[${index}]`, {}),
          ...changedFields,
        });
      }
    }
    // else {
    //   let newIndex = (() => {
    //     return lodash.get(draftState, `businessData.agentList`, [])?.length || 0;
    //   })();
    //   lodash.set(draftState, `businessData.agentList[${newIndex}]`, {
    //     ...changedFields,
    //     agentType: AgentType.Commission,
    //   });
    // }
  });
  return { ...nextState };
};
