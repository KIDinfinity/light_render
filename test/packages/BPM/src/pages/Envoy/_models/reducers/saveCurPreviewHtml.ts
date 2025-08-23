import { produce } from 'immer';
export default function saveCurPreviewHtml(state: any, { payload }: any) {
  //将修改后的html赋值到after的previewAttachFiles和originalSendParam中
  const {
    finalPreviewHtml,
    previewSelectLetter,
    previewSelectEnclosureIndex,
    selectEnclosure,
  } = payload;
  return produce(state, (draftState: any) => {
    const targetFile =
      draftState?.previewModeData?.letters?.[previewSelectLetter]?.after?.params
        ?.previewAttachFiles?.[previewSelectEnclosureIndex];
    const targetTemplate =
      draftState?.previewModeData?.letters?.[previewSelectLetter]?.originalSendParam?.templateInfo;
    if (targetFile) {
      draftState.previewModeData.letters[previewSelectLetter].after.params.previewAttachFiles[
        previewSelectEnclosureIndex
      ].previewHtml = finalPreviewHtml;
    }
    if (targetTemplate) {
      const targetIndex = targetTemplate.findIndex(
        (item) => item.templateCode === selectEnclosure.templateCode
      );
      if (targetIndex > -1) {
        draftState.previewModeData.letters[previewSelectLetter].originalSendParam.templateInfo[
          targetIndex
        ].previewHtml = finalPreviewHtml;
      }
    }
  });
}
