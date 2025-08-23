import lodash from 'lodash';
import { TEST, REGISTERTOOLSDATA, SAVEVIEWACTIVED, FORCEUPDATE } from '../actions';
import type { ActionModel } from '../../_dto/model';
import test from './test';
import registerToolData from './registerToolData';
import saveViewActived from './saveViewActived';
import forceUpdate from './forceUpdate';

const collection = {
  [TEST]: test,
  [REGISTERTOOLSDATA]: registerToolData,
  [SAVEVIEWACTIVED]: saveViewActived,
  [FORCEUPDATE]: forceUpdate,
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
