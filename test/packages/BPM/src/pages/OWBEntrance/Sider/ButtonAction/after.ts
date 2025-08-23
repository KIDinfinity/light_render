import lodash from 'lodash';
import { history } from 'umi';
import { taskGoBack } from '@/utils/task';
import { AfterType } from '../../constants';
import notice from './notice';
import bpm from '../../API/api';

const runAfterByType = ({ contextDispatch, buttonConfig, status, type }: any) => {
  const afterType = (() => {
    const params = new URL(document.location).searchParams;
    const afterHook = params.get('afterHook');
    return afterHook || type;
  })();
  switch (afterType) {
    case AfterType.UpdateStatus:
      contextDispatch({
        type: 'setButtonStatus',
        payload: {
          buttonCode: buttonConfig.buttonCode,
          status,
        },
      });
      break;

    case AfterType.Back:
      taskGoBack();
      break;

    case AfterType.Reload:
      (bpm as any).reload();
      break;
    case AfterType.CloseWin:
      history.push('/navigator');
      break;
    default:
      break;
  }
};

export default async ({
  responseCollect,
  after,
  buttonConfig,
  dispatch,
  contextDispatch,
  isAuto,
  taskDetail,
}: any) => {
  if (lodash.isFunction(after)) {
    const result = await after({
      responseCollect,
      buttonConfig,
      dispatch,
      contextDispatch,
      isAuto,
      taskDetail,
    });

    runAfterByType({
      dispatch,
      contextDispatch,
      status: result?.status,
      type: result?.type,
      buttonConfig,
    });
    if (result?.message) {
      notice({
        message: result?.message,
        buttonCode: result?.buttonCode,
      });
    }
  }

  if (lodash.isPlainObject(after)) {
    runAfterByType({
      dispatch,
      contextDispatch,
      buttonConfig,
      type: after.type,
    });
  }
};
