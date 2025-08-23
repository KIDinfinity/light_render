/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;
    const singleTopupPath = `entities.transactionTypesMap[${transactionId}].singleTopup`;

    if (!lodash.isArray(lodash.get(draftState, `${singleTopupPath}.fundList`))) {
      lodash.set(draftState, `${singleTopupPath}.fundList`, []);
    }

    lodash.set(
      draftState,
      `${singleTopupPath}.fundList`,
      lodash.get(draftState, `${singleTopupPath}.fundList`).map((item) => ({
        ...item,
        isAdd: true,
      }))
    );

    lodash.set(
      draftState,
      `${singleTopupPath}.totalTopupAmount`,
      lodash.sum(
        lodash
          .get(draftState, `${singleTopupPath}.fundList`)
          .map((childItem) => Number(formUtils.queryValue(childItem?.topupAmount) || 0))
      )
    );
  });
