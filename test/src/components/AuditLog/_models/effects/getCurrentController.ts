export default function* getCurrentController(_: any, { select }: any) {
  return yield select((state: any) => state.auditLogController.currentController);
}
