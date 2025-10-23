
export default function* ({ payload }: PayProps, { select }: SagaProps) {
  const { functionData, listPage, userId, versionList } = yield select((state: any) => ({
    ...state.permissionConfigurationController,
    userId: state.user.currentUser?.userId,
  }));

  return {
    functionData,
    listPage,
    versionList,
    operator: userId,
  };
}
