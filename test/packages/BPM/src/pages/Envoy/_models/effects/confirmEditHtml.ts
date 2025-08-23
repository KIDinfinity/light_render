import { saveReasonGroupPreviewData } from '@/services/envoyReasonGroupPreviewControllerService';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';

export default function* confirmEditHtml(_: any, { call, select, put }: any) {
  /*
  1.调saveReasonGroupPreviewData保存pdf（该传的都传过去）
  2.重新获取最新的pdf展示（这个应该可以走固定流程）
  */
  const { activedGroupKey, currentReasonGroups, previewModeData } = yield select(
    ({ envoyController }: any) => ({
      previewModeData: envoyController.previewModeData,
      currentReasonGroups: envoyController.currentReasonGroups,
      activedGroupKey: envoyController.activedGroupKey,
    })
  );
  const currentReason = lodash
    .chain(currentReasonGroups)
    .find((ele, index) => index === activedGroupKey)
    .value();
  let data = formUtils.cleanValidateData(previewModeData);

  data = {
    ...data,
    letters: data.letters.map((letterItem) => {
      /*
          1.ph根据sendPreviewData那里，需要做兼容逻辑，content进行替换
          2.after需要使用before的替换，整体替换为before，after中的previewHtmls需要保留
        */
      let content = letterItem?.before?.params?.content;
      const previewAttachFiles = letterItem?.after?.params?.previewAttachFiles || [];

      if (tenant.region() === Region.PH) {
        content = letterItem?.before?.params?.content?.replace(/\r\n/g, '\n') || '';
      }
      const curAfterParams = { ...letterItem?.before?.params, content, previewAttachFiles };

      return {
        ...letterItem,
        after: {
          params: curAfterParams,
        },
      };
    }),
  };

  const response: any = yield call(saveReasonGroupPreviewData, {
    previewDataJson: JSON.stringify(data),
    reasonDetailId: currentReason.reasonDetails[0].id,
    reasonGroupId: currentReason.reasonDetails[0].reasonGroupId,
  });
  yield put({
    type: 'saveSelectEnclosureEdit',
    payload: {
      previewSelectEnclosureEdit: false,
    },
  });

  if (response.success) {
    yield put({
      type: 'clearAttachmentData',
    });
  }
}
