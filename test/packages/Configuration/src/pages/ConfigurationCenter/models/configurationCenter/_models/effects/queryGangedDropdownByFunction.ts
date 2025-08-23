import lodash from 'lodash';
import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  queryGangedDropdownByFunction,
} from '@/services/ccSetupControllerService';
import { handlerQueryDropDown } from 'configuration/pages/ConfigurationCenter/Utils/Handle';

export default function* ({ payload }: PayProps, { put, call, select }: SagaProps) {
  const { functionId, record } = payload;
  const { functionData, current } = yield select((state: any) => state.configurationCenter);
  const response = yield call(queryGangedDropdownByFunction, {
    functionId,
    record,
  });
  if (response && response.success) {
    const changeFields = lodash.keys(response.resultData).reduce((arrs: any[], cur: string) => {
      const values = lodash.get(response.resultData, cur);
      return lodash.concat(arrs, lodash.isArray(values) && values.length ? values : []);
    }, []);

    const { newDataField, newCurrent } = handlerQueryDropDown(
      functionData,
      changeFields,
      current,
      record
    );

    yield put({
      type: 'saveFunctionData',
      payload: {
        functionData: {
          ...functionData,
          dataFieldList: newDataField,
        },
        current: newCurrent,
      },
    });
  }
}
