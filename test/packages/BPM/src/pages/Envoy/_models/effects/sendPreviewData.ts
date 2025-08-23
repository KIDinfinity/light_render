import { saveReasonGroupPreviewData } from '@/services/envoyReasonGroupPreviewControllerService';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';

export default function* sendPreviewData(_: any, { call, select, put }: any) {
  const { activedGroupKey, currentReasonGroups, previewResolve, previewModeData } = yield select(
    ({ envoyController }: any) => ({
      previewModeData: envoyController.previewModeData,
      currentReasonGroups: envoyController.currentReasonGroups,
      activedGroupKey: envoyController.activedGroupKey,
      previewResolve: envoyController.previewResolve,
    })
  );
  const currentReason = lodash
    .chain(currentReasonGroups)
    .find((_, index) => index === activedGroupKey)
    .value();
  let data = formUtils.cleanValidateData(previewModeData);

  if (tenant.region() === Region.PH) {
    data = {
      ...data,
      letters: data.letters.map((letterItem) => ({
        ...letterItem,
        after: {
          params: {
            ...(letterItem?.after?.params || {}),
            content: letterItem?.after?.params?.content?.replace(/\r\n/g, '\n') || '',
          },
        },
      })),
    };
  }

  const response: any = yield call(saveReasonGroupPreviewData, {
    previewDataJson: JSON.stringify(data),
    reasonDetailId: currentReason.reasonDetails[0].id,
    reasonGroupId: currentReason.reasonDetails[0].reasonGroupId,
  });

  if (response.success) {
    yield put({
      type: 'clearPreivewModeData',
    });
  }

  previewResolve({ result: response.success, data: { previewDataId: response.resultData } });
}
