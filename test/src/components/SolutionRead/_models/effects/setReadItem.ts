import lodash from 'lodash';
import { addBizObjReadRecord } from '@/services/bpmReadCordService';
interface IAction {
  payload: {
    subjectIdList: any;
    subjectType: string;
    callback?: Function;
  };
}

export default function* getReaderData({ payload }: IAction, { put, select, call }: any) {
  const { subjectIdList, subjectType, callback } = payload;
  const { taskDetail, readUserId, isAssinee } = yield select(
    ({ solutionRead }: any) => solutionRead
  );

  const params = {
    caseNo: taskDetail?.caseNo,
    inquiryBusinessNo: taskDetail?.inquiryBusinessNo,
    readUserId,
    subjectIdList,
    subjectType,
    readType: !!isAssinee ? 'NR' : 'NACR',
  };
  // @ts-ignore
  const response = yield call(addBizObjReadRecord, params);

  if (lodash.isPlainObject(response) && response.success) {
    yield put({
      type: 'getReaderData',
      payload: {
        subjectType,
      },
    });
    if (lodash.isFunction(callback)) {
      callback();
    }
  }
}
