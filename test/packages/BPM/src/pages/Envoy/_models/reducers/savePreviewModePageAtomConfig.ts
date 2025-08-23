export default function savePreviewModePageAtomConfig(state: any, { payload }: any) {
  const { previewModePageAtomConfig } = payload;

  return {
    ...state,
    previewModePageAtomConfig,
  };
}
