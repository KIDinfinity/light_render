import lodash from 'lodash';
import { inquiryUserBizObjReadHistory } from '@/services/bpmReadCordService';

interface IAction {
  payload: {
    subjectType: string;
  };
}

export default function* getReaderData({ payload }: IAction, { call, put, select }: any) {
  const { subjectType } = payload;
  const { taskDetail, readUserId, readData } = yield select(
    ({ solutionRead }: any) => solutionRead
  );

  // @ts-ignore
  const response = yield call(inquiryUserBizObjReadHistory, {
    readUserId,
    subjectType,
    caseNo: taskDetail.caseNo,
    inquiryBusinessNo: taskDetail.inquiryBusinessNo,
  });
  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response?.resultData) &&
    lodash.isArray(response?.resultData?.subjectIdList) &&
    lodash.size(response?.resultData?.subjectIdList) > 0
  ) {
    yield put({
      type: 'saveState',
      payload: {
        readData: {
          ...readData,
          [subjectType]: response?.resultData?.subjectIdList,
        },
      },
    });
  }
}
