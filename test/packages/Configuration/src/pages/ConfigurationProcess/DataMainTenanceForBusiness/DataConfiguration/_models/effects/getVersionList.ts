import { getVersionData } from '@/services/ccJpDataImageControllerService';
import { ConfigurationEnum } from '@/enum/GolbalAuthority';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { authorityCodeList } = yield select((state: any) => state.authController);
  // 没权限，阻断接口
  if (!authorityCodeList?.includes(ConfigurationEnum.configurationCenter_ViewIneffectiveData)) {
    return;
  }

  const { record, functionId } = yield select((state: any) => ({
    record: state.dataConfigurationController.formData,
    functionId: state.dataConfigurationController?.functionData?.id,
  }));

  const response = yield call(getVersionData, {
    records: [{ ...record }],
    functionId,
  });

  if (response?.success && response?.resultData) {
    yield put({
      type: 'saveVersionList',
      payload: {
        versionList: response?.resultData,
      },
    });
  }
}
