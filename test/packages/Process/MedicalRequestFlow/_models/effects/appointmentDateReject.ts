import lodash from 'lodash';
import { reject } from '@/services/owbRegistrationMedicalCheckControllerService';
import { NAMESPACE } from 'process/MedicalRequestFlow/activity.config';

export default function* (_: any, { select, call, put }: any) {
  const businessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData
  );
  const { businessNo, inquiryBusinessNo, policyNo, appointmentDateList } = lodash.pick(
    businessData,
    ['businessNo', 'inquiryBusinessNo', 'appointmentDateList', 'policyNo']
  );
  const targetAppointmentDateList = lodash.chain(appointmentDateList).first().value();
  const response = yield call(reject, {
    businessNo,
    inquiryBusinessNo,
    policyNo,
    appointmentDateList: [{ ...targetAppointmentDateList, status: 'reject' }],
  });
  const { success } = lodash.pick(response, ['success']);
  if (success) {
    yield put({
      type: 'rejectApointmentDate',
    });
    yield put({
      type: `processTask/toogleMedicalRequestModal`,
      payload: {
        medicalRequestModalDisplay: false,
      },
    });
  }
}
