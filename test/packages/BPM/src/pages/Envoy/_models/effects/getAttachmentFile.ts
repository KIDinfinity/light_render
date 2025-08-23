import { downloadAttachFilePDF } from '@/services/mcCorrespondenceControllerService';
import lodash from 'lodash';
import { EnovyEnclosureType, EnovyEnclosureImgTypes } from 'bpm/pages/Envoy/enum';

export default function* getAttachmentFile({ payload }: any, { call, select, put }: any) {
  const mimeTypeMap = {
    [EnovyEnclosureImgTypes.PNG]: 'image/png',
    [EnovyEnclosureImgTypes.JPG]: 'image/jpeg',
    [EnovyEnclosureImgTypes.GIF]: 'image/gif',
    [EnovyEnclosureImgTypes.SVG]: 'image/svg+xml',
    [EnovyEnclosureImgTypes.ICO]: 'image/x-icon',
    [EnovyEnclosureImgTypes.BMP]: 'image/bmp',
    [EnovyEnclosureType.PDF]: 'application/pdf',
  };
  const { index, attachment } = payload;
  const { fileFullName } = attachment;
  const currentType = lodash
    .chain(fileFullName)
    .split('.')
    .get(fileFullName?.split('.').lastIndex)
    .toUpper()
    .value();
  const { previewSelectEnclosureIndex, previewModeData, previewSelectLetter } = yield select(
    ({ envoyController }: any) => ({
      previewSelectEnclosureIndex: envoyController.previewSelectEnclosureIndex,
      previewModeData: envoyController.previewModeData,
      previewSelectLetter: envoyController.previewSelectLetter,
    })
  );
  if (index !== previewSelectEnclosureIndex) {
    //重置附件编辑内容
    yield put({
      type: 'envoyController/clearPreviewEditContent',
    });
  }

  const originalSendParam = lodash.cloneDeep(
    previewModeData?.letters?.[previewSelectLetter]?.originalSendParam
  );
  if (lodash.isArray(originalSendParam?.templateInfo)) {
    originalSendParam?.templateInfo.forEach((item) => {
      if (attachment?.templateCode === item?.templateCode) {
        item.previewHtml =
          previewModeData.letters[previewSelectLetter]?.after?.params?.previewAttachFiles?.[
            previewSelectEnclosureIndex
          ].previewHtml;
      }
    });
    originalSendParam.templateInfo = originalSendParam?.templateInfo.filter((item) => {
      return attachment?.templateCode === item?.templateCode;
    });
  }

  const params = {
    fileFullName: attachment?.fileFullName,
    correspondenceArg: originalSendParam,
  };
  const response = yield call(downloadAttachFilePDF, params);
  let previewUrl = '';
  if (response && response.blob) {
    const result = yield response.blob().then((res) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.addEventListener('loadend', function () {
          resolve(reader.result);
        });
      });
    });

    const byteCharacters = atob(result.split(',')[1]);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers); // 创建 Blob 对象
    const blob = new Blob([byteArray], { type: mimeTypeMap?.[currentType] }); // 创建 URL
    // mimeTypeMap?.[currentType] // 创建 URL

    previewUrl = URL.createObjectURL(blob);
  }

  yield put({
    type: 'savePreviewUrl',
    payload: {
      previewUrl,
    },
  });
}
