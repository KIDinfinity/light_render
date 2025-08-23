import { formUtils } from 'basic/components/Form';
import { history } from 'umi';

export default function* ({ payload }: any, { select }: any) {
  const { dashboardCode, chartValue } = payload;
  const { linkedReportCode, searchDatas, redirectReportCode } = yield select(
    (state: any) => state.dashboardController?.chartListMap?.[dashboardCode]
  ) || {};

  history.push({
    pathname: '/navigator/reportcenter',
    search: `?linkedReportCode=${redirectReportCode || linkedReportCode}&originalLinkedReportCode=${linkedReportCode}&searchFields=${JSON.stringify({
        ...formUtils.queryValue(searchDatas),
        ...chartValue,
      })}`
  });
}
