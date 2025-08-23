
export default function* (_: any, { select }: any) {
  const {
    taskDetail
  } = yield select((state: any) => ({
    ...state.exceptionalHandlingController
  }));

  return taskDetail
}
