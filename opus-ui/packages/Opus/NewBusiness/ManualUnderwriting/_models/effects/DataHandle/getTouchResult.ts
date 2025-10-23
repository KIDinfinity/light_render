import lodash from 'lodash';
import getTouch from './getTouch';

/**
 * 操作流程(TODO:后端应该给回mapping扁平化数据给我们)
 * 1.反扁平化处理
 * 2.FETOBE转化
 * 3.数据组装
 * 4.请求submit
 * 5.扁平化数据
 */

/**
 *
 * @param param0  - 原始数据
 * @param entities - 扁平化后的数据
 * @returns
 */

export default function* ({ payload }: any, { select }: any): Generator<any, any, any> {
  const { type, businessData } = payload;
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask) || {};

  // 3.数据组装
  const params = {
    businessData,
    ...lodash.pick(taskDetail, [
      // 'activityKey',
      'assignee',
      'businessNo',
      'caseCategory',
      'caseNo',
      'inquiryBusinessNo',
      // TODO：这个字段是否会有
      'companyCode',
      'taskId',
    ]),
    activityKey: taskDetail?.taskDefKey,
    operationType: type,
  };

  // 4.请求数据
  const response = yield getTouch({ params }, {});

  return response;
}
