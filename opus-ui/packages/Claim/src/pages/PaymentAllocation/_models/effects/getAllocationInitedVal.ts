export default function* getAllocationInitedVal(_: any, { select }: any) {
  const inited = yield select(({ paymentAllocation }: any) => paymentAllocation.inited);
  return inited;
}
