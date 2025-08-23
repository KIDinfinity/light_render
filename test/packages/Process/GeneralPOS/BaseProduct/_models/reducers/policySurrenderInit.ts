/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import moment from 'moment';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, isNotDataCapture } = payload;
    const policySurrenderPath = `entities.transactionTypesMap[${transactionId}].policySurrender`;

    if (lodash.isEmpty(lodash.get(draftState, `${policySurrenderPath}`))) {
      lodash.set(draftState, `${policySurrenderPath}`, {});
    }
    if (
      isNotDataCapture &&
      lodash.isEmpty(lodash.get(draftState, `${policySurrenderPath}.cvDate`))
    ) {
      lodash.set(draftState, `${policySurrenderPath}.cvDate`, moment().format());
    }
  });
