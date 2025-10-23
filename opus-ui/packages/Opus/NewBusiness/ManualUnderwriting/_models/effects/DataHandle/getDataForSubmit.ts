import lodash from 'lodash';
import requestHandleType from 'bpm/enum/requestHandleType';
import { NAMESPACE } from '../../../activity.config';

import { packFundChartDataUrl } from './getDataForSave';

export default function* (_: any, { select, put }: any): Generator<any, any, any> {
  // 添加转换成后端需要数据处理开始
  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);
  const fundChartDataUrl = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.fundChartDataUrl
  );

  const businessData: any = yield put.resolve({
    type: 'getFEToBE',
    payload: {
      processData,
      entities,
    },
  });

  if (lodash.isEmpty(businessData)) {
    return requestHandleType.break;
  }

  const mainCoverageFundChartDataUrl = packFundChartDataUrl(businessData, fundChartDataUrl);
  if (mainCoverageFundChartDataUrl.index !== -1) {
    lodash.set(
      businessData,
      `policyList.0.coverageList.[${mainCoverageFundChartDataUrl.index}].fundChartDataUrl`,
      mainCoverageFundChartDataUrl.fundChartDataUrl
    );
  }
  return businessData;
}
