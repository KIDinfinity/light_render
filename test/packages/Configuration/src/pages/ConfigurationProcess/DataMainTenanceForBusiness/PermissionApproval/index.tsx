import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { Spin } from 'antd';
import VersionControl from 'configuration/components/VersionControl';
import TableList from './TableList';
import styles from './index.less';
import Header from './Header';

function PermissionApproval() {
  const dispatch: Dispatch = useDispatch();
  const functionLoading: boolean = useSelector((state: any) => state.loading.effects['permissionConfigurationController/getClaim']);
  const functionData: boolean = useSelector((state: any) => state.permissionConfigurationController.functionData);
  const versionList: boolean = useSelector((state: any) => state.permissionConfigurationController?.versionList);
  const authorityCodeList: boolean = useSelector((state: any) => state.authController?.authorityCodeList)|| [];

  useEffect(() => {
    dispatch({
      type: 'permissionConfigurationController/getClaim',
    });
    return () => {
      dispatch({
        type: 'permissionConfigurationController/clearClaim',
      });

    }
  }, []);

  return (
    <div className={styles.configuration}>
      {!functionLoading ? (
        <>
          {functionData?.id && (
            <>
              <Header />
              <VersionControl
                isShow
                versionList={versionList}
                isEditable={false}
                isAudit
                authorityCodeList={authorityCodeList}
              />
              <TableList />
            </>
          )}
        </>
      ) : (
        <div className={styles.emptyBox}>
          <Spin tip="Loading..." size="large" />
        </div>
      )}
    </div>
  );

}
export default PermissionApproval;
