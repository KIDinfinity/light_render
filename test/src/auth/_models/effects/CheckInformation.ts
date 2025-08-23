import { serialize as objectToFormData } from 'object-to-formdata';
import { getAuth } from '@/auth/Utils';
import { Category } from '@/auth/Constant';
import { getTask } from '@/services/navigatorCaseManagementControllerService';

export default function* (_: any, { put, select }: any) {
  const commonAuthorityList = yield select(
    (state: any) => state.authController.commonAuthorityList
  );

  const taskId = yield select((state: any) => state.envoyController?.taskId);
  const detail = yield getTask(
    objectToFormData({
      taskId,
    })
  );

  const InfoView = getAuth(commonAuthorityList, {
    authorityCode: Category.infoView,
    caseCategory: detail?.caseCategory,
    activityCode: detail?.taskDefKey,
  });

  yield put({
    type: 'saveInfoPermissions',
    payload: {
      authInfoEditable: getAuth(commonAuthorityList, {
        authorityCode: Category.infoEdit,
        caseCategory: detail?.caseCategory,
        activityCode: detail?.taskDefKey,
        assignee: detail?.assignee,
      }),
      authInfoVisible: InfoView,
    },
  });

  if (!InfoView) {
    yield put({
      type: 'navigatorInformationController/clearInformation',
    });
  }

  return InfoView;
}
