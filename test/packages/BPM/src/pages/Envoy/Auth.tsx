import React, { useEffect } from 'react';
import { useSelector, useDispatch,  } from 'dva';
import { shallowEqual } from 'react-redux';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import { getAuth } from '@/auth/Utils';
import { Category } from '@/auth/Constant';
import Envoy from './Envoy';
import { getAuthByAuthorityCode } from '@/auth/Utils';
import { MatchTypeEnum } from '@/auth/Constant';

const Auth = ({ children, localTaskDetail, remoteTaskDetail }: any) => {
  const dispatch = useDispatch();
  const commonAuthorityList = useSelector(
    (state: any) => state.authController.commonAuthorityList,
    shallowEqual
  );

  useEffect(() => {
    if (localTaskDetail || remoteTaskDetail) {
      const data = {
        caseCategory: (localTaskDetail || remoteTaskDetail).caseCategory,
        activityCode:
          (localTaskDetail || remoteTaskDetail).activityKey ||
          (localTaskDetail || remoteTaskDetail).taskDefKey,
        assignee: (localTaskDetail || remoteTaskDetail).assignee,
        limitType: 'ROOT',
      };
      const authEnvoyVisible: boolean = getAuth(commonAuthorityList, {
        authorityCode: Category.envoyView,
        ...data,
      });
      const authEnvoyEditable: boolean = getAuth(commonAuthorityList, {
        authorityCode: Category.envoyEdit,
        ...data,
      });
      const authEnvoySendable: boolean = getAuth(commonAuthorityList, {
        authorityCode: Category.envoySend,
        ...data,
      });
      const envoyEditBanned = getAuthByAuthorityCode(
        commonAuthorityList,
        {
          authorityCode: 'RS_BP_Envoy_envoyViewOnly',
        },
        { type: MatchTypeEnum.NeedExist }
      );

      dispatch({
        type: 'authController/saveEnvoyPermissions',
        payload: {
          authEnvoyVisible,
          authEnvoyEditable: !envoyEditBanned && authEnvoyEditable,
          authEnvoySendable,
        },
      });
    }
  }, [localTaskDetail, remoteTaskDetail]);

  return (
    <>
      {React.cloneElement(children, {
        taskDetail: localTaskDetail || remoteTaskDetail,
      })}
    </>
  );
};

export default () => (
  <CaseTaskDetail.Pending.Consumer>
    <Auth>
      <Envoy />
    </Auth>
  </CaseTaskDetail.Pending.Consumer>
);
