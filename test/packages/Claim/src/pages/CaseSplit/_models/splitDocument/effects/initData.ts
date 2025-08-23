import { getDrowDownList } from '@/utils/dictFormatMessage';

export default function* ({ payload }: any, { put }: any) {
  const applicationType = getDrowDownList('applicationType');

  yield put({
    type: 'saveInitData',
    payload: {
      claimProcessData: payload.claimData,
      applicationType: applicationType || [],
    },
  });
}
