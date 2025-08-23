import { LS, LSKey } from '@/utils/cache';
import { formUtils } from 'basic/components/Form';

export default function* (_: any, { select, put }: any) {
  const { chartListMap, chartListAll, categoryList, departmentList } = yield select(
    (state: any) => state.dashboardController
  );
  LS.setItem(LSKey.Dashboard, {
    chartListAll,
    chartListMap: formUtils.cleanValidateData(chartListMap),
    categoryList,
    departmentList,
  });
  yield put({
    type: 'cleanDashboard',
  });
}
