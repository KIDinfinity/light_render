import { getTask } from '@/services/navigatorTaskOperationControllerService';

export default function* getBusinessData(_: any, { call, select }: any) {
  const taskId: string = yield select(({ processTask }: any) => processTask?.getTask?.taskId);

  const requestParam = {
    dataType: 'mainPage',
    skipSnapshot: true,
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
