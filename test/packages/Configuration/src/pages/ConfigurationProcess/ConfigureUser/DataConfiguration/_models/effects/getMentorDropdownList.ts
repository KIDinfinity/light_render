import { allMentor } from '@/services/ccCombineDataControllerService';

export default function* ({ payload }: any, { call, put, select }: any) {

  const response = yield call(allMentor);

  if (response?.success && response?.resultData) {
    yield put({
      type: 'saveMentorDropdownList',
      payload: {
        mentorDropdownList: response.resultData || [],
      },
    });
  }
}
