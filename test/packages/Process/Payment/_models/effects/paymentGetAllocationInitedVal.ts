export default function* getAllocationInitedVal({ payload }: any, { select }: any) {
  const { NAMESPACE } = payload;
  const inited = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.inited
  );
  return inited;
}
