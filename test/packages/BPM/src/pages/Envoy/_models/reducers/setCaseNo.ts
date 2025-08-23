import lodash from 'lodash';

interface IAction {
  payload: {
    caseNo: string;
    taskId?: string;
  };
}

export default function (state: any, { payload }: IAction) {
  const { caseNo, taskId } = lodash.pick(payload, ['caseNo', 'taskId']);

  const obj = {
    caseNo,
    taskId,
  };
  // 在有taskId的时候，存一份来自对应taskId的caseNo起来
  // 后面如果envoy输入框的caseNo和主页面的caseNo相同,需要将taskId也传给后端，用于获取快照的envoy列表（getEnvoyInfo）
  if (lodash.isString(taskId) && !lodash.isEmpty(taskId)) {
    obj.mainPageCaseNo = caseNo;
    obj.mainPageTaskId = taskId;
  }
  return {
    ...state,
    ...obj,
  };
};
