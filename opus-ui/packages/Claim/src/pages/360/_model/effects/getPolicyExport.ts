import {
  asyncExportExcel,
  downloadExportExcelByAsyncId,
} from '@/services/c360SideBarControllerService';
import { saga } from 'dva';
import lodash from 'lodash';

const { delay } = saga;

export default function* getPolicyExport(_: any, { call, put, select }: any) {
  yield put({
    type: 'setExportLoading',
    payload: {
      isExportLoading: true,
    },
  });
  const activeClient = yield select((state: any) => state?.insured360?.activeClientId);
  const sideBarOverallList = yield select((state: any) => state?.insured360?.sideBarOverallList);

  const targetInfo = sideBarOverallList?.find((i) => i?.keyClientId === activeClient);

  let asyncId;

  try {
    const asyncExportExcelRes = yield call(asyncExportExcel, JSON.stringify(targetInfo));
    if (asyncExportExcelRes.success) {
      asyncId = asyncExportExcelRes.resultData;
    }
  } catch (error) {
    console.error('Error in asyncExportExcel:', error);

    yield put({
      type: 'setExportLoading',
      payload: {
        isExportLoading: false,
      },
    });

    // return error;
  }

  if (!lodash.isNil(asyncId)) {
    const startTime = Date.now();
    while (true) {
      try {
        console.log('start to export 🚀🚀🚀🚀🚀🚀');

        const res = yield call(
          downloadExportExcelByAsyncId,
          JSON.stringify({
            asyncId,
          })
        );
        if (res?.size > 0) {
          // if success, out of the looping
          console.log('Export successful:', res);
          break;
        }
      } catch (error) {
        console.error('Error in downloadExportExcelByAsyncId:', error);
        break;
      }

      // Check if 5 minutes have passed
      if (Date.now() - startTime > 5 * 60 * 1000) {
        console.error('Polling timed out after 5 minutes');
        break;
      }

      yield delay(5000);
    }
  }

  yield put({
    type: 'setExportLoading',
    payload: {
      isExportLoading: false,
    },
  });
}
