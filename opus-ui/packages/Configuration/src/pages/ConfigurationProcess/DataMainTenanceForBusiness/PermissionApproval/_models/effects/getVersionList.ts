import { getVersionDataTimeBar } from '@/services/ccJpDataImageControllerService';
import { ConfigurationEnum } from '@/enum/GolbalAuthority';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { caseNo } = payload;
  const { authorityCodeList } = yield select((state: any) => state.authController);
  // 没权限，阻断接口
  if (!authorityCodeList?.includes(ConfigurationEnum.configurationCenter_ViewIneffectiveData)) {
    return;
  }

  const response = yield call(getVersionDataTimeBar, caseNo);

  if (response?.success && response?.resultData) {
    yield put({
      type: 'saveVersionList',
      payload: {
        versionList: response?.resultData,
        isAudit: true,
      },
    });
  }
}
