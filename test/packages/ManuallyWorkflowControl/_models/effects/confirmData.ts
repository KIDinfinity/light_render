import lodash from 'lodash';
import navigatorManuallyWorkflowControlApiService from '@/services/navigatorManuallyWorkflowControlApiService';

export default function* confirmData(_: any, { select, call, put }: any) {
  const formData: any = yield select((state: any) => state?.manuallyWorkflowController?.formData);
  const { targetActivityKey, targetActivities, ...restData } = formData;
  const currentTargetActivityData = lodash
    .chain(targetActivities)
    .find({
      nextActivityKey: targetActivityKey,
    })
    .value();
  const res: any = yield call(navigatorManuallyWorkflowControlApiService.confirm, {
    ...restData,
    ...currentTargetActivityData,
  });

  if (lodash.isPlainObject(res) && res.success && lodash.isPlainObject(res.resultData)) {
    yield put({
      type: 'changeCaseNo',
      payload: {
        caseNo: res?.resultData?.caseNo,
      },
    });
  }
}
