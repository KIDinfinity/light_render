import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { messageModal } from '@/utils/commonMessage';
import SnapshotCheckVersionModal from 'claim/utils/SnapshotCheckVersionModal';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default function* validateProduct(_: any, { select, put }: any) {
  const businessData = yield select((state: any) => state.manualUnderwriting.businessData);
  const taskDetail = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail
  );
  const { success, versionNo, userName } =
    (yield put.resolve({
      type: 'task/checkVersion',
      payload: { taskId: taskDetail?.taskId },
    })) || {};
  if (!success) {
    yield SnapshotCheckVersionModal({ versionNo, userName });
  }

  const coverageList = lodash.get(businessData, 'policyList[0].coverageList', []);
  const planProductConfig = yield select(
    (state: any) => state.manualUnderwriting?.planProductConfig
  );
  const allProducts = lodash.concat(
    lodash.get(planProductConfig, 'basicPlanProductFeatureList', []),
    lodash.get(planProductConfig, 'otherPlanProductFeatureList', [])
  );
  const requiredProductList = planProductConfig?.requiredProductCodeList;
  const isMissRequiredCode = !lodash.every(requiredProductList, (code: any) => {
    return lodash.some(coverageList, (item: any) => {
      return formUtils.queryValue(item?.coreCode) === code;
    });
  });
  const miscProductNames = lodash
    .chain(requiredProductList)
    .filter((code) => {
      return lodash.some(coverageList, (item: any) => {
        return formUtils.queryValue(item?.coreCode) !== code;
      });
    })
    .map((code) => {
      return lodash
        .chain(allProducts)
        .find((item) => item.productCode === code)
        .get('productName')
        .value();
    })
    .join(', ')
    .value();
  // 当必选的rider product没有被选中时，报错
  if (isMissRequiredCode) {
    messageModal({
      typeCode: 'Label_COM_WarningMessage',
      dictCode: 'MSG_000623',
      args: [miscProductNames],
    });
    return false;
  }
  return !isMissRequiredCode;
}
