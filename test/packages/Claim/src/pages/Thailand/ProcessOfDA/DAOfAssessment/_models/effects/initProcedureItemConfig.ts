import { getSurgicalPackageList } from '@/services/claimSurgicalPackageControllerService';

export default function* initProcedureItemConfig({ payload }: any, { select, put, call }: any) {
  const { displaySurgicalPackage, isHistory } = payload;
  const taskNotEditable = yield select(({ claimEditable }: any) => claimEditable.taskNotEditable);

  let config = [];
  if (displaySurgicalPackage && !isHistory && !taskNotEditable) {
    const response = yield call(getSurgicalPackageList);
    if (response?.success) {
      config = response?.resultData || [];
    }
  }

  yield put({
    type: 'saveSurgicalPackageMapList',
    payload: {
      surgicalPackageMapList: config,
    },
  });

  yield put({
    type: 'saveShowSurgicalPackage',
    payload: {
      show: displaySurgicalPackage,
    },
  });
}
