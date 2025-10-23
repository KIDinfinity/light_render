import { deleteData } from '@/services/dcSnapshotService';

export default function* (_: any, { call, select }: any): Generator<any, void, any> {
  const businessData = yield select((state: any) => state.processTask.getTask);

  yield call(deleteData, {
    businessNo: businessData?.businessNo,
    dataType: 'mainPage',
    taskId: businessData?.taskId,
  });
}
