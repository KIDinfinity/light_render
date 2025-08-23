import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const changedFields = lodash.get(action?.payload, ['changedFields']);
  const id = lodash.get(action?.payload, ['id']);
  const nextState = produce(state, (draftState: any) => {
    const index = lodash
      .chain(draftState)
      .get('agentData', [])
      .findIndex((agent: any) => agent.id === id)
      .value();

    lodash.set(draftState, 'stepsChange.OtherInfo', true);
    if (index !== -1) {
      if (lodash.has(changedFields, 'crossSelling')) {
        lodash.set(
          draftState,
          `agentData[${index}].crossSelling`,
          lodash.join(formUtils.queryValue(changedFields.crossSelling), ',')
        );
      } else {
        lodash.set(draftState, `agentData[${index}]`, {
          ...lodash.get(draftState, `agentData[${index}]`, {}),
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
