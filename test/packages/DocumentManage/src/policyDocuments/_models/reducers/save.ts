export default function (state: any, { payload }: any) {
  return { ...state, ...payload };
}
