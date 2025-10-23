import React from 'react';
import { useSelector } from 'dva';
import { Save } from 'configuration/components/Operators';
import Role from './Role';
import Permission from './Permission';

export default () => {
  const {  userGroupList, isAdd, taskNotEditable, functionData, formData } = useSelector(({ configureRoleController, claimEditable }: any) => {
    return {
      userGroupList: configureRoleController?.userGroupList,
      isAdd: configureRoleController.isAdd,
      taskNotEditable: claimEditable.taskNotEditable,
      functionData: configureRoleController.functionData,
      formData: configureRoleController.formData,
    }
  });
  return (
    <>
      <Role  userGroupList={userGroupList} />
      <Permission/>
      {isAdd && <Save taskNotEditable={taskNotEditable} functionData={functionData} type='configureRoleController' formData={formData} />}
    </>
  );
};
