import { get, set } from 'lodash';
import type { VNBCalculatorState } from '../state/index';
import { produce }  from 'immer';

export default (state: VNBCalculatorState, { payload }) => {
  const { key, mainFactor } = payload;
  const benKey = key.substring(0, key.lastIndexOf('.'));
  const nextState = produce(state, (draftState) => {
    const subBenefit = get(draftState, benKey);
    if (subBenefit) {
      const draftBenefit = { ...subBenefit };
      Array(10)
        .fill(0)
        .forEach((_, index) => {
          if (draftBenefit[`sumAssured${index + 1}`]) {
            delete draftBenefit[`sumAssured${index + 1}`];
          }
        });
    }
    set(draftState, `${benKey}.mainBenefitSAFactor`, mainFactor);
  });
  return nextState;
};
