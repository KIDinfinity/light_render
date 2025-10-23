import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const fundChartDataUrl = lodash.get(action, 'payload.fundChartDataUrl');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'fundChartDataUrl', fundChartDataUrl);
  });
  return { ...nextState };
};
