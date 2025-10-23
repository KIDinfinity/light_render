import { formUtils } from 'basic/components/Form';

export default function* (_: any, { put, select }: any): any {
  const formData = yield select((state: any) => state.sqlController?.checkForm);

  yield put({
    type: 'getOnlineCheckList',
    payload: {
      formData: formUtils.cleanValidateData(formData),
    },
  });
}
