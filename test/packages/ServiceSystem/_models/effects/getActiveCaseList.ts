import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import bpmProcessTaskService from '@/services/bpmProcessTaskService';

export default function* getActiveCaseList(_: any, { put }: any) {
  const response = yield bpmProcessTaskService.findAutoActivityTask();

  if (
    lodash.isPlainObject(response) &&
    response?.success &&
    lodash.isPlainObject(response.resultData) &&
    lodash.isArray(response.resultData?.autoTaskDetailList)
  ) {
    const { autoTaskDetailList, totalCount } = response.resultData;
    yield put({
      type: 'saveOnlineCaseList',
      payload: {
        onlineCaseList: autoTaskDetailList.map((el: any) => ({ ...el, id: uuidv4() })),
        onlineTotal: totalCount,
      },
    });
  }
}
