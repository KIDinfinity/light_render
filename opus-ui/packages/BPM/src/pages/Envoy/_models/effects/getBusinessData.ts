import { getTask } from '@/services/navigatorTaskOperationControllerService';

export default function* getBusinessData({ payload }: any, { call, select }: any) {
  const isSnapshot = payload?.isSnapshot || false;
  const taskId: string = yield select(({ processTask }: any) => processTask?.getTask?.taskId);

  const requestParam = {
    dataType: 'mainPage',
    skipSnapshot: isSnapshot ? false : true,
    taskId,
  };

  // @ts-ignore
  const response: any = yield call(getTask, requestParam);
  if (response.success && response.resultData) {
    return response.resultData?.businessData;
  } else {
    return {};
  }
}
