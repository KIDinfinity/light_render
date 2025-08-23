import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Spin } from 'antd';
import User from './User';
import UserGroup from './UserGroup';
import ModalUser from '../User';
import { FunctionCode } from 'configuration/pages/NavigatorConfiguration/Enum';
import { companyCodeHandler } from 'configuration/utils';
import styles from './index.less';

export default ({ underAuditData }: any) => {
  const dispatch = useDispatch();
  const [showUser, setShowUser] = useState(false);
  let { previewRecord } = useSelector((state: any) => state.configureUserController);
  previewRecord = underAuditData || previewRecord;
  const {
    functionData: { operationList, functionCode },
  } = useSelector((state: any) => state.configurationController);
  const loading = useSelector(
    (state: any) => state.loading.effects['configureUserController/getPreview']
  );

  useEffect(() => {
    dispatch({
      type: 'configureUserController/getMentorDropdownList',
    });
  }, []);

  const onOpenUser = ({ group_code }: any) => {
    setShowUser(true);
    dispatch({
      type: 'configureUserController/getUserList',
      payload: {
        group_code,
      },
    });
  };
  const onOpenSetting = (item: any, type: string) => {
    const config = {
      group: FunctionCode.Fun_venus_rbac_rbac_group,
      role: FunctionCode.Fun_venus_rbac_rbac_role
    }
    dispatch({
      type: 'configurationController/startProcess',
      payload: {
        rows: companyCodeHandler.toBE([item]),
        functionCode: config?.[type]
      },
    });
  };
  return (
    <div>
      {!loading ? (
        <div className={styles.content}>
          <User formData={previewRecord?.data} />
          <UserGroup
            groupData={previewRecord?.subSection}
            onOpenUser={onOpenUser}
            onOpenSetting={onOpenSetting}
          />
          <ModalUser showUser={showUser} setShowUser={setShowUser} />
        </div>
      ) : (
        <div className={styles.loading}>
          <Spin tip="Loading..." size="large" />
        </div>
      )}
    </div>
  );
};
