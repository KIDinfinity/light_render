import lodash from 'lodash';
import { produce }  from 'immer';

export default (state: any, action: any) => {
  const manualundwritingOriginBizData = lodash.get(
    action,
    'payload.manualundwritingOriginBizData',
    {}
  );
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'manualundwritingOriginBizData', manualundwritingOriginBizData);
  });
  return {
    ...nextState,
  };
};
