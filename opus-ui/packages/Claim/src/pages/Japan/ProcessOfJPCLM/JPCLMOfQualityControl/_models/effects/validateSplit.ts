export default function* validateFields(_: any, { select }: any) {
  const { claimDatas = [] } = yield select((state: any) => state.JPCLMOfQualityController);

  if (claimDatas.length < 2) {
    return [{}];
  }

  return null;
}
