import lodash from 'lodash';
import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { coreCode, issueAge, submissionDate, productList } = lodash.pick(action?.payload, [
    'coreCode',
    'issueAge',
    'submissionDate',
    'productList',
  ]);

  const nextState = produce(state, (draftState: any) => {
    const key = `${coreCode}-${issueAge}-${submissionDate}`;
    lodash.set(draftState, `planProductDuration.${key}`, productList);
  });

  return nextState;
};
