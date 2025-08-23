export default function* getErrors(_: any, { select }: any) {
  const errors = yield select(({ paymentAllocation }: any) => paymentAllocation.errors);
  return errors;
}
