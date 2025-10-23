export default function* getErrors(_: any, { select }: any) {
  const errors = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.errors
  );
  return errors;
}
