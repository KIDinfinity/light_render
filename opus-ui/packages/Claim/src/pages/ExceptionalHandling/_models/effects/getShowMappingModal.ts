
export default function* (_: any, { select }: any) {
  const {
    showMappingModal
  } = yield select((state: any) => ({
    ...state.exceptionalHandlingController
  }));

  return showMappingModal
}
