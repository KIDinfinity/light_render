import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'dva';
import { Save } from 'configuration/components/Operators';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Icon } from 'antd';
import UserGroup from './UserGroup';
import Role from './Role';
import Section from './Section';
import SectionModal from './Role/SectionModal';
import styles from './index.less';

const FormData = ({ isAdd, formData, taskNotEditable, functionData, allRoleInfo }: any) => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state: any) => state.configureUserGroupController);
  const { isUpdate } = useSelector((state: any) => state.configureUserGroupController);
  const title = formatMessageApi({ Label_COM_ConfigurationCenter: 'AssociatedUser' });
  useEffect(() => {
    if (formData?.data?.group_code && isUpdate) {
      dispatch({
        type: 'configureUserGroupController/getUserList',
        payload: {
          group_code: formData?.data?.group_code,
        },
      });
    }
  }, [formData?.data?.group_code]);
  return (
    <>
      <div className={styles.container}>
        <Section
          title={formatMessageApi({
            Label_COM_General: 'UserGroup',
          })}
          isBgc
        >
          <UserGroup isAdd={isAdd} taskNotEditable={taskNotEditable} formData={formData} />
        </Section>
        {isUpdate && (
          <SectionModal
            list={userList[formData?.data?.group_code] || []}
            title={title}
            code="user_id"
            name="user_name"
          >
            <div className={styles.userBtn}>
              <Icon type="user" />
              <span>{userList[formData?.data?.group_code]?.length || 0}Users</span>
            </div>
          </SectionModal>
        )}
      </div>
      <Role
        groupData={allRoleInfo}
        isAdd={isAdd}
        taskNotEditable={taskNotEditable}
        formData={formData}
      />
      {isAdd && (
        <Save
          taskNotEditable={taskNotEditable}
          functionData={functionData}
          type="configureUserGroupController"
          formData={formData}
        />
      )}
    </>
  );
};

export default connect(({ configureUserGroupController, claimEditable }: any) => ({
  isAdd: configureUserGroupController.isAdd,
  taskNotEditable: claimEditable.taskNotEditable,
  functionData: configureUserGroupController.functionData,
  formData: configureUserGroupController.formData,
  allRoleInfo: configureUserGroupController.allRoleInfo,
}))(FormData);
