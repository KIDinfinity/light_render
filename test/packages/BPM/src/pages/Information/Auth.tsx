import React, { useState, useEffect } from 'react';
import { useSelector } from 'dva';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import { getAuth } from '@/auth/Utils';
import { Category } from '@/auth/Constant';
import Information from './Information';

const Auth = ({ children, localTaskDetail, remoteTaskDetail }: any) => {
  const commonAuthorityList = useSelector(
    (state: any) => state?.authController?.commonAuthorityList
  );

  const [authInfoVisible, setAuthInfoVisible] = useState(true);
  const [authInfoEditable, setAuthInfoEditable] = useState(true);
  useEffect(() => {
    (async () => {
      if (localTaskDetail || remoteTaskDetail) {
        const data = {
          caseCategory: (localTaskDetail || remoteTaskDetail).caseCategory,
          activityCode:
            (localTaskDetail || remoteTaskDetail).activityKey ||
            (localTaskDetail || remoteTaskDetail).taskDefKey,
          assignee: (localTaskDetail || remoteTaskDetail).assignee,
        };
        setAuthInfoVisible(
          getAuth(commonAuthorityList, {
            authorityCode: Category.infoView,
            ...data,
          })
        );
        setAuthInfoEditable(
          getAuth(commonAuthorityList, {
            authorityCode: Category.infoEdit,
            ...data,
          })
        );
      }
    })();
  }, [localTaskDetail, remoteTaskDetail, commonAuthorityList]);
  return (
    <>
      {React.cloneElement(children, {
        authInfoVisible,
        authInfoEditable,
        taskDetail: localTaskDetail || remoteTaskDetail,
      })}
    </>
  );
};

export default () => (
  <CaseTaskDetail.Information.Consumer>
    <Auth>
      <Information />
    </Auth>
  </CaseTaskDetail.Information.Consumer>
);
