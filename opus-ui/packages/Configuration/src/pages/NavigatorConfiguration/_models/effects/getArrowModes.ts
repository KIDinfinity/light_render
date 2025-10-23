export default function* ({ payload }: any, { put, select }: any) {
  const { mode } = yield select((state: any) => {
    return {
      mode: state.configurationController?.mode,
    };
  });

  return mode;
}
