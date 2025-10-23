import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default function* (action: any, { put, select }) {
  const {
    processData = [],
    id,
    caseCategory,
    transactionTypeName,
    slaDuration,
  } = lodash.pick(action?.payload, [
    'processData',
    'id',
    'caseCategory',
    'transactionTypeName',
    'slaDuration',
  ]);
  const { processList = [], selectedTransactionTypes = [] } = yield select((state) => ({
    processList: state?.batchCreateProcess?.processList,
    selectedTransactionTypes: state?.batchCreateProcess?.selectedTransactionTypes,
  }));
  const extraText =
    lodash.max([lodash.toNumber(slaDuration), 1]) === 1
      ? formatMessageApi({
          Label_BPM_CaseInfo: 'Day',
        })
      : formatMessageApi({
          Label_BPM_CaseInfo: 'Days',
        });
  const newList = lodash
    .chain([
      ...processList,
      {
        activities: processData,
        id,
        caseCategory,
        transactionTypeName,
        slaDuration: `${slaDuration} ${extraText}`,
      },
    ])
    .filter((item) => selectedTransactionTypes.includes(item.id))
    .uniqBy('id')
    .value();
  yield put({
    type: 'setProcessList',
    payload: {
      processList: newList,
    },
  });
}
