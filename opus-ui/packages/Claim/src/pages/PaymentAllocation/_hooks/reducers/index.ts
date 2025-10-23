import lodash from 'lodash';
import { FORCEUPDATE, EXCLUDEBENEFICIARY } from '../actions';
import type { ActionModel } from '../actions/ActionModel';
import forceUpdate from './forceUpdate';
import excludeBeneficiary from './excludeBeneficiary';

const collection = {
  [FORCEUPDATE]: forceUpdate,
  [EXCLUDEBENEFICIARY]: excludeBeneficiary,
};

export default (state: any, action: ActionModel) =>
  lodash
    .chain(collection)
    .map((reducer, type) => {
      if (action.type === type) {
        return reducer(state, action);
      }
      return null;
    })
    .compact()
    .first()
    .value();
