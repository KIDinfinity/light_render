import React, { useContext } from 'react';
import { useSelector } from 'umi';
import NoPremissionByDrawer from '@/pages/Exception/NoPremissionByDrawer';
import { formUtils } from 'basic/components/Form';
import NoPremission from '@/pages/Exception/NoPremission';
import TaskDetailContext from 'navigator/components/CaseTaskDetail/Context';

function Index({ type, children, claimNo, caseDetailCaseNo }) {
  const { taskDetail: remoteTaskDetail }: any = useContext(TaskDetailContext);
  let getHiddenCallback = {
    information: (state) => {
      return state.authController.noPermissionCases[
        formUtils.queryValue(state.navigatorInformationController.informationData?.caseNo)
      ];
    },
    envoy: (state) => {
      return state.authController.noPermissionCases[
        formUtils.queryValue(state.envoyController.caseNo)
      ];
    },
    360: (state) => {
      const changeId = state.insured360?.taskInfo?.changeId || '';
      return (
        state.authController.noPermissionClaimNos[changeId] ||
        state.authController.noPermissionCases[changeId]
      );
    },
    caseDetail: (state) => {
      return state.authController.noPermissionCases[caseDetailCaseNo];
    },
    taskDetail: (state) => {
      return state.authController.noPermissionCases[
        remoteTaskDetail?.caseNo ||
          remoteTaskDetail?.procInstId ||
          remoteTaskDetail?.processInstanceId
      ];
    },
    history: (state) => {
      return state.authController.noPermissionCases[claimNo];
    },
  }[type];

  // 未知的权限类别默认不隐藏
  if (!getHiddenCallback) getHiddenCallback = () => false;

  const isHidden = useSelector(getHiddenCallback);
  if (!isHidden) return <>{children}</>;

  const component =
    {
      information: <NoPremissionByDrawer />,
      envoy: <NoPremissionByDrawer />,
      360: <NoPremissionByDrawer />,
      caseDetail: <NoPremission />,
      taskDetail: <NoPremission />,
      history: <NoPremission />,
    }[type] || null;
  return <>{component}</>;
}
export default Index;
