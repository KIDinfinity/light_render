import { calculateAge } from '@/services/ccBpmControllerService';
import { transferDate } from 'basic/utils/transferDate';
export default function* updateDateOfBirth({ payload = {} }: any, { put, call, select }) {
  const { dateOfBirth, isInsured } = payload;
  const getTask = yield select((state) => state.processTask.getTask);

  const { businessCode, submissionChannel } = getTask;
  const result = yield call(calculateAge, {
    dateOfBirth: transferDate(dateOfBirth),
    submissionChannel,
    businessCode,
  });
  if (result?.success) {
    const reducer = isInsured ? 'saveInsuredInfo' : 'savePayorInfo';
    const age = result?.resultData?.clientAge;
    yield put({
      type: reducer,
      payload: {
        changedFields: {
          age,
        },
      },
    });
    // if (isInsured) {
    //   yield put({
    //     type: 'saveICPIDCard',
    //     payload: {
    //       changedFields: {
    //         age,
    //       },
    //     },
    //   });
    // }
  }
}
