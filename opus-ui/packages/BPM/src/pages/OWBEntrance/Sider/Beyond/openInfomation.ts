/**
 * 打开情报管理
 */
export default async ({ categoryCode, dispatch }: any) => {
  await dispatch({
    type: 'navigatorInformationController/autoAddInformationHandle',
    payload: {
      changedFields: {
        categoryCode,
      },
    },
  });
  await dispatch({
    type: 'workspaceSwitchOn/changeSwitch',
    payload: {
      name: 'remark',
    },
  });
};
