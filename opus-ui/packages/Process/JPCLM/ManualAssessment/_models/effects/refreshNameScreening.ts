import claimAmlNameScreenControllerService from '@/services/claimAmlNameScreenControllerService';

export default function* refreshNameScreening({ payload }: any, { call, put}: any) {

    const response =  yield call(claimAmlNameScreenControllerService.refreshNameScreen, payload);

    if (response && response?.success && response?.resultData) {
        yield put({
            type: 'saveNameScreening',
            payload: response?.resultData
        })
    }
}
