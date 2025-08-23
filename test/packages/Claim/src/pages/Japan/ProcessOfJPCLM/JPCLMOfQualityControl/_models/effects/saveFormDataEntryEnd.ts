import lodash from 'lodash';
import saveFormData from '../reducers/saveFormData';
import saveFormDataItem from '../reducers/saveFormDataItem';
import saveFormDataItemAuto from '../reducers/saveFormDataItemAuto';
import saveReceiveDate from '../reducers/saveReceiveDate';

const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

const saveFormDataEntryEnd = [
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function* ({ payload }: any, { put, select, call }: any) {
    yield call(delay, 1);

    const sequence = yield select((state: any) => state.sequence.sequence);
    let newState = yield select((state: any) => state.JPCLMOfQualityController);
    // eslint-disable-next-line array-callback-return
    lodash.map(sequence, ({ target, payload }: any) => {
      if (target === 'JPCLMOfQualityController/saveFormData') {
        newState = saveFormData(newState, {
          type: 'saveFormData',
          isValidating: true,
          payload,
        });
      } else if (target === 'JPCLMOfQualityController/saveFormDataItem') {
        newState = saveFormDataItem(newState, {
          type: 'saveFormDataItem',
          payload,
        });
      } else if (target === 'JPCLMOfQualityController/saveFormDataItemAuto') {
        newState = saveFormDataItemAuto(newState, {
          type: 'saveFormDataItemAuto',
          payload,
        });
      } else if (target === 'JPCLMOfQualityController/saveReceiveDate') {
        newState = saveReceiveDate(newState, {
          type: 'saveReceiveDate',
          payload,
        });
      }
    });

    yield put({
      type: 'saveState',
      payload: newState,
    });

    yield put({
      type: 'sequence/clear',
    });
  },
  {
    type: 'takeLatest',
  },
];

export default saveFormDataEntryEnd;
