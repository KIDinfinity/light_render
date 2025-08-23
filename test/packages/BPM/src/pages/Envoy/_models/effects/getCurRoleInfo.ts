import lodash from 'lodash';
import envoyTemplateControllerService from '@/services/envoyTemplateControllerService';

interface IAction {
  payload: {
    curDestRole: string;
    roleInfoKey: string;
  };
}

export default function* getCurRoleInfo({ payload }: IAction, { call, select, put }: any) {
  const { curDestRole, roleInfoKey, groupCode } = payload;

  const {
    caseNo,
    inquiryBusinessNo,
    businessNo,
    caseCategory,
    taskId,
    activityKey: activityCode,
  } = yield select((state: any) =>
    lodash.pick(state.envoyController, [
      'caseNo',
      'inquiryBusinessNo',
      'businessNo',
      'caseCategory',
      'taskId',
      'activityKey',
    ])
  );

  const params: any = {
    role: curDestRole,
    businessNo,
    claimNo: businessNo,
    caseCategory,
    caseNo,
    inquiryBusinessNo,
    taskId,
    activityCode,
    groupCode,
  };
  switch (curDestRole) {
    case 'Agent':
      params.type = 'AGT';
      break;
    case 'Underwriter':
      params.type = 'UW';
      break;
    case 'AssessmentTeamLeader':
      params.roleCode = 'ROL004';
      break;
    default:
      break;
  }
  const paramDataResponse = yield call(envoyTemplateControllerService.getParamData, params);

  if (
    lodash.isPlainObject(paramDataResponse) &&
    paramDataResponse.success &&
    lodash.isArray(paramDataResponse.resultData)
  ) {
    const resultData = lodash.get(paramDataResponse, 'resultData');
    yield put.resolve({
      type: 'saveDestRoleInfo',
      payload: {
        roleInfoKey,
        roleInfo: resultData?.filter((item: any) => !lodash.isEmpty(item?.fullName)),
      },
    });
  }
}
