import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* (action: any, { put }) {
  const { changedFields } = lodash.pick(action?.payload, ['changedFields']);
  const selectedTransactionTypes = formUtils.queryValue(changedFields.selectedTransactionTypes);
  yield put({
    type: 'setSelectedTransactionTypes',
    payload: {
      selectedTransactionTypes,
    },
  });
}
