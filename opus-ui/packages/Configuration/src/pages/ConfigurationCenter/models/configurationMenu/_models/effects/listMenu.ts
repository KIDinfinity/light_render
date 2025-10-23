import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { listMenu } from '@/services/ccFunctionControllerService';
import { handleMenu } from 'configuration/pages/ConfigurationCenter/Utils/Menu';

export default function* ({ payload }: PayProps, { put, call }: SagaProps) {
  const response = yield call(listMenu, payload);

  if (
    response &&
    response.success &&
    response.resultData &&
    response.resultData.subFunctionList
  ) {
    const { menuTemp = [], menu = {}, defaultMenu, openKeys, dataImageMenu } = handleMenu(
      response.resultData.subFunctionList
    );
    const { id: functionId, functionCode } = dataImageMenu || {};
    yield put({
      type: 'save',
      payload: {
        menuTemp,
        menu,
        isInit: !!response.resultData,
      },
    });

    yield put({
      type: 'setDefaultOpenKeysAndMenu',
      payload: {
        defaultMenu,
        openKeys,
      },
    });

    if (functionId && functionCode) {
      yield put({
        type: 'configurationDataImage/getDataImageFunction',
        payload: {
          dataImageMenu,
        },
      });
    }
  }
}
