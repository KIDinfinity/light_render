export default function* getAllocationInitedVal(_: any, { select }: any) {
  const inited = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.inited
  );
  return inited;
}
